const ExifReader = require('exifreader');

const getImageExif = (filePathOfImage) => {
  return ExifReader.load(filePathOfImage);
};

module.exports = {
  getImageExif,
};

// const test = async () => {
//   const mediaDirectory = '../../../../Downloads/2021 iphotos';
//   const imageFile = 'lp_image (1).heic';
//   const exif = await getImageExif(`${mediaDirectory}/${imageFile}`);

//   console.log('\n');
//   console.log('--------->');
//   console.log('exif => ', exif);
//   console.log('<---------');
//   console.log('\n');
// };

// test();
