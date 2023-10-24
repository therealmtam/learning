const {
  extractListOfAllMediaTimestampsUsingXmpData,
} = require('./extractListOfAllMediaTimestampsUsingXmp');
const {
  extractListOfFavoritedMedia,
} = require('./extractListOfFavoritedMedia');
const {
  extractListOfImagesMissingTimestamp,
} = require('./extractListOfImagesMissingTimestamp');

const mediaDirectory = '../../../../Downloads/2021 iphotos';

const main = async () => {
  await extractListOfImagesMissingTimestamp(mediaDirectory);
  await extractListOfAllMediaTimestampsUsingXmpData(mediaDirectory);
  await extractListOfFavoritedMedia(mediaDirectory);
};

main();
