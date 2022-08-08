const crypto = require('crypto');

const testOfEvenDistributionOfHash = () => {
  const mapToTrackUniqueVals = {};
  const mapToTrackUniqueVals2 = {};
  const uniqueHashesToGen = 100;
  const baseSeed = 'someUserId@gmail.com';

  for (let i = 0; i < uniqueHashesToGen; i++) {
    const uniqueSeed = baseSeed + i;
    const uniqueHash = crypto.createHash('md5').update(uniqueSeed).digest("hex"); //ex. 43521736878befa6d4d4a7e84604168c

    const integerRepOfHash = parseInt(uniqueHash, 16); //ex. 8.948451487568053e+37

    /*
    modToUse is adjusted based on how many unique values are needed from the integer representation of the hash so that hash collisions due to reduction in unique hash values is not going to occur.

    In this case, we adjust modToUse to achieve unique bounded values from 0-99.
     */
    const modToUse = 1000000;
    const asBoundedInt = integerRepOfHash % modToUse; //ex. 919040

    // use map to track unique values
    mapToTrackUniqueVals[asBoundedInt] = true;
    mapToTrackUniqueVals2[integerRepOfHash] = true;
  }

  console.log('\n\n');
  console.log('TEST OUTPUT:');
  console.log('======================');
  console.log('mapToTrackUniqueVals => ', mapToTrackUniqueVals);
  console.log('numberOfUniqueBoundedValues => ', Object.keys(mapToTrackUniqueVals).length);
  console.log('numberOfUniqueBoundedValues2 => ', Object.keys(mapToTrackUniqueVals2).length);
  console.log('\n\n');
}

testOfEvenDistributionOfHash();

/*
- Based on the smallest percentage you can set (ex. if it is in increments of 1), you would need at least (100/smallestIncrement) number of unique users in order for you to get a data set that when plotted would show an even distribution of that granularity. For example, with an experiment where we want 1 out of 100 to receive the treatment vs the control, we should at least get 100 users receive one or the other before we reveiw the data.

  - So maybe a criteria for a basic experimentation assignment system is to do its best to ensure that even with the minimal number of users needed for an even distribution, it would have properly bucketed them in either the treatment or control.

    - So lets assume the Experiment Assignment System has a set granularity of 1%.

      - One way the system could operate is by assigning/tagging the user with the count of person to have received the treament. (ex. "<someExpIdentifier>_1" for the first user to receive the experiment assignment). Then to compute the real-time results for say an experiment that had 20% treatment 80% control, you would be considering treatment data from users 1-20 for the first 100 users, 101-120 for the next 100 users, etc.

        *note: This would require the persistence of the previous count and the complications of persisting that value either in memory or other means.

      - The one downside of this approach is the inability to support a feature to forever tie a specific known user (does not include anon users) to a specific bucket - ex. if a logged-in user received the treatment for the experiment on their mobile app then logged-in on their desktop, they would end up seeing the same experiment.

      The purpose of the feature could be to try and reduce noise in the experiment results by eliminating multiple counts of data from the same known user that has been bucketed into one or the other bucket more than one time during the lifetime of the experiment.

        - A brute force solution is to persist data indicating their assignment against userId, but this is not scalable or cost efficient if you have many users or many experiments given the number of rows in the table being #users * number of experiments and the overhead to manage the data collected.

        - Another solution is to think about known and anon users as 2 different groups which we will distribute into buckets differently amongst their group.

        For anon users, there is no way for us to uniquely and consistently identify them, so we can bucket them using the method above where we tag them based on their arrival to the experiment.

        For known users in our system, we can use a crude method of using the rowId of their User record to determine their position in a 1-100 scale amongst all users in our DB. (ex. userA's record is in row 10 of our table and we have 210 users, so 10/210*100 = position 4.7 which we can round to position 4 or 5 since our Experiment Systems's granularity is in increments of 1%).

        The downside of this approach is now for an experiment of 20% treatment 80% control, it is not guaranteed that of 100 consecutive users arriving at the experiment, there will be 20 in treatment and 80 in control because known users are bucketed differently. However, during the data gathering stage, as long as we also identify the number of anon and known users receiving either A/B, we can easily extend the experiment to receive more data which can mute the impact of the different bucket strategy on the even distribution of data collected.

        A weakness of this approach is a user's position depends on #OfUsers in the db which could change over the lifetime of the experiment thereby nullifying the ability to consistently bucket the user if the # of users in the DB is small and every increase in count could move a user's computed position by more than 1%. If a user is in row 1000 and there are 1MM users and 10K are added in the span of the experiment's lifetime, the user's computed position goes from 0.1 (rounds to position 1) to 0.099 (rounds to position 1). And because this solution is in assumption of the need for a more scalable solution than persisting a user's position in an experiment, this weakness may not have a significant impact. Nonetheless, it should be acknowledged.
*/
