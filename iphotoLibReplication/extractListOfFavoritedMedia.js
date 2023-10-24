const fs = require('fs');
const { readXmp, extractKeywords } = require('./extractXmp');

const initiateFiles = () => {
  const fileName = 'listOfFavoritedMedia';
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

const extractListOfFavoritedMedia = async (mediaDirectory) => {
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
        const xmpData = readXmp(pathToXmp);
        const keywords = extractKeywords(xmpData);

        if (keywords.includes('favorite')) {
          fs.appendFileSync(dataFilePath, `"${fileNameWithoutExt}",\n`);
        }
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

// extractListOfFavoritedMedia();

module.exports = {
  extractListOfFavoritedMedia,
};
