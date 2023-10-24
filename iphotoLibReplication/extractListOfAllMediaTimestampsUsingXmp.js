const fs = require('fs');
const { readXmp, extractDateCreatedFromXmp } = require('./extractXmp');
const { getUtcFormatted } = require('./convertUTCTo');

const initiateFiles = () => {
  const fileName = 'listOfAllMediaTimestampsUsingXmpData';
  const timeNow = Date.now();
  const dataFilePath = `./output/${fileName}-${timeNow}.json`;
  const errorFilePath = `./output/${fileName}-errors-${timeNow}.json`;
  fs.writeFileSync(dataFilePath, '[');
  fs.writeFileSync(errorFilePath, '[');
  return {
    dataFilePath,
    errorFilePath,
  };
};

const mapOfFileTypes = {
  mov: 'video',
  mp4: 'video',
  xmp: 'xmp',
  aae: 'aae', // apple's aae photo edits data file
  png: 'image',
  heic: 'image',
  jpg: 'image',
  jpeg: 'image',
};

const extractListOfAllMediaTimestampsUsingXmpData = async (mediaDirectory) => {
  mediaDirectory = mediaDirectory || '../../../../Downloads/2021 iphotos';

  // create the output files
  const { dataFilePath, errorFilePath } = initiateFiles();

  // get a list of all filenames in the exported iphotos, exported as originals with xmp as separate files
  const listOfFiles = fs.readdirSync(mediaDirectory);

  // go through all the filenames
  for (let i = 0; i < listOfFiles.length; i++) {
    const fileName = listOfFiles[i];

    // get the file extension
    const fileNameComponents = fileName.split('.');
    const fileExtension =
      fileNameComponents[fileNameComponents.length - 1] ?? '';
    const normalizedFileExt = fileExtension.toLowerCase();

    fileNameComponents.pop();
    const fileNameWithoutExt = fileNameComponents.join('.');

    if (!normalizedFileExt || !mapOfFileTypes[normalizedFileExt]) {
      fs.appendFileSync(errorFilePath, `"${fileName}:unknown_file_type",\n`);
    } else {
      // get the file type from the extension
      const fileType = mapOfFileTypes[normalizedFileExt];

      if (fileType === 'xmp') {
        const pathToXmp = `${mediaDirectory}/${fileName}`;

        // extract the photoshop:DateCreated time which also includes the offset (of -07:00) which was applied to the original UTC to result in the time shown of 2023-10-04T21:36:47-07:00 which translates to 9:36:47 pm PST
        const xmpData = readXmp(pathToXmp);
        const dateImageCreated = extractDateCreatedFromXmp(xmpData);

        // then convert that 24 hour time into am or pm
        const { date, time } = getUtcFormatted(dateImageCreated);

        fs.appendFileSync(
          dataFilePath,
          `"${fileNameWithoutExt}:${date}:${time}",\n`
        );
      }
    }
  }

  console.log('completed processing all media');

  // modify the file to be a proper json
  const dataFileContents = fs.readFileSync(dataFilePath, 'utf8');
  if (dataFileContents[dataFileContents.length - 2] === ',') {
    const modifiedContents = dataFileContents.slice(0, -2) + ']';
    fs.writeFileSync(dataFilePath, modifiedContents, 'utf8');
  } else {
    fs.appendFileSync(dataFilePath, ']');
  }

  // modify the file to be a proper json
  const erroFileContents = fs.readFileSync(errorFilePath, 'utf8');
  if (erroFileContents[erroFileContents.length - 2] === ',') {
    const modifiedContents = erroFileContents.slice(0, -2) + ']';
    fs.writeFileSync(errorFilePath, modifiedContents, 'utf8');
  } else {
    fs.appendFileSync(errorFilePath, ']');
  }
};

// extractListOfAllMediaTimestampsUsingXmpData();

module.exports = {
  extractListOfAllMediaTimestampsUsingXmpData,
};
