const convertUTCToAMPM = (utcTimestamp) => {
  const date = new Date(utcTimestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;

  return formattedTime;
};

// const utcTimestamp = 1634965500000; // Replace this with your UTC timestamp
// const utcTimestamp = '2023-10-04T21:36:47-07:00'; // Replace this with your UTC timestamp
// const utcTimestamp = '2023-10-04T21:36:47Z'; // Replace this with your UTC timestamp
// const utcTimestamp = '2023-10-04T00:59:59Z'; // Replace this with your UTC timestamp
// const formattedTime = convertUTCToAMPM(utcTimestamp);
// console.log(formattedTime);

const removeOffsetFromUtcTime = (utcWithOffset) => {
  const timeComponents = utcWithOffset.split('-');
  timeComponents.pop();
  return timeComponents.join('-');
};

const utcTimeHasOffset = (utcTime) => {
  const regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2})/;

  // const timestamp1 = '2023-10-04T21:36:47-07:00';
  // const timestamp2 = '2023-10-04T21:36:47Z'; // No offset
  // const timestamp3 = '2023-10-04T21:36:47+02:30';

  // console.log(regex.test(timestamp1)); // true, contains an offset
  // console.log(regex.test(timestamp2)); // false, no offset
  // console.log(regex.test(timestamp3)); // true, contains an offset

  return regex.test(utcTime);
};

const extractDateFromUTC = (utcString) => {
  const date = new Date(utcString);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's zero-based
  const day = date.getUTCDay().toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

// Example usage:
// const utcString = '2023-10-04T21:36:47-07:00';
// const extractedDate = extractDateFromUTC(utcString);
// console.log(extractedDate);

const getUtcFormatted = (utcTime) => {
  /*
  remove the offset because the offset is just extra info to inform
  the reader of the utc time that the utc time shown had an offset already
  applied to it. Thus, if we pass in the offset to a new Date, it will
  AGAIN apply that offset to the time which is not what we want.
  */
  const timeWithoutOffset = utcTimeHasOffset(utcTime)
    ? removeOffsetFromUtcTime(utcTime) + 'Z' // the Z is important to signify it Date to not convert the utc time to local time
    : utcTime;

  return {
    time: convertUTCToAMPM(timeWithoutOffset),
    date: extractDateFromUTC(timeWithoutOffset),
  };
};

// const test = '2021-12-23T17:03:48-08:00';
// console.log('\n');
// console.log('--------->');
// console.log('test => ', getUtcFormatted(test));
// console.log('<---------');
// console.log('\n');

module.exports = {
  getUtcFormatted,
};
