const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const readXmp = (filePathToXmpFile) => {
  const data = fs.readFileSync(filePathToXmpFile, 'utf8');
  const parser = new XMLParser();
  return parser.parse(data);
};

const extractDateCreatedFromXmp = (xmpData) => {
  return xmpData?.['x:xmpmeta']?.['rdf:RDF']?.['rdf:Description']?.[
    'photoshop:DateCreated'
  ];
};

const extractKeywords = (xmpData) => {
  const keywords =
    xmpData?.['x:xmpmeta']?.['rdf:RDF']?.['rdf:Description']?.['dc:subject']?.[
      'rdf:Seq'
    ]?.['rdf:li'];

  if (!keywords) {
    return [];
  }

  if (Array.isArray(keywords)) {
    return keywords;
  }

  if (typeof keywords === 'string') {
    return [keywords];
  }
};

module.exports = {
  readXmp,
  extractDateCreatedFromXmp,
  extractKeywords,
};
