const { Given, When, Then } = require('@cucumber/cucumber');

let thingsThatImpactLucysHearing = {
  distance: null,
  string: null,
};

/*
{int} is a step-definition pattern aka cucumber expression
*/
Given(
  'Lucy is located {int} metres from Sean',
  function (distance /*callback*/) {
    console.log('distance: ', distance);

    thingsThatImpactLucysHearing.distance = distance;

    // callback(Error('exit')); //both result in test erroring out but shown differently
    // callback('exit'); //both result in test erroring out but shown differently

    // if callback is an argument into the function, then you need to use it, else the test will time out and hang and error out.

    // return 'pending';
    return;
  }
);

When('Sean shouts {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions

  console.log('string: ', string);
  thingsThatImpactLucysHearing.string = string;

  // return 'pending';
  return;
});

Then("Lucy hears Sean's message", function (callback) {
  // Write code here that turns the phrase above into concrete actions
  console.log('thingsThatImpactLucysHearing: ', thingsThatImpactLucysHearing);

  if (
    thingsThatImpactLucysHearing.distance === null &&
    thingsThatImpactLucysHearing.string === null
  ) {
    return 'pending';
  }

  const result =
    thingsThatImpactLucysHearing.distance === 10 &&
    thingsThatImpactLucysHearing.string === "free bagels at Sean's"
      ? true
      : false;

  const errMsg = 'The result of the test failed with ' + result;
  const error = new Error(errMsg);
  callback(error);
});
