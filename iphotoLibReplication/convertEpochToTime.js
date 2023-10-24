const convertEpochToTime = (epochTimestamp) => {
  const epochDate = new Date(epochTimestamp);

  const utcTime = epochDate.toISOString();

  const localTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/Los_Angeles',
  }).format(epochDate);

  return {
    utcTime,
    localTime,
  };
};

// Example usage with a POSIX Epoch timestamp (e.g., 1697721345000)
const epochTimestamp = 1697721345000;
const times = convertEpochToTime(epochTimestamp);

console.log('UTC Time:', times.utcTime);
console.log('Local Time:', times.localTime);

module.exports = convertEpochToTime;
