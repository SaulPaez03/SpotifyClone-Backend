const DatauriParser = require('datauri/parser');

export function getMulterFileDataURI(file: Express.Multer.File) {
  const parser = new DatauriParser();

  return parser.format(file.originalname, file.buffer).content;
}
