const fs = require('fs');

const mediaDirectory = '../../../../Downloads/2021 iphotos';

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

const listOfFiles = fs.readdirSync(mediaDirectory);

let countOfVideosPhotos = 0;

// go through all the filenames
for (let i = 0; i < listOfFiles.length; i++) {
  const fileName = listOfFiles[i];

  // get the file extension
  const fileNameComponents = fileName.split('.');
  const fileExtension = fileNameComponents[fileNameComponents.length - 1] ?? '';
  const normalizedFileExt = fileExtension.toLowerCase();

  const fileType = mapOfFileTypes[normalizedFileExt];

  if (fileType === 'video' || fileType === 'image') {
    countOfVideosPhotos++;
  }
}

console.log('\n');
console.log('--------->');
console.log('count => ', countOfVideosPhotos);
console.log('<---------');
console.log('\n');
