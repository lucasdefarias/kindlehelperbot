const kindlegen = require("kindlegen");
const path = require("path");
const fs = require("fs").promises;

const pdfConverter = (info) => {
  throw new Error("Not implemented");
};

const mobiConverter = (info) => {
  throw new Error("Not implemented");
};

const epubConverter = async ({ filePath }) => {
  const fileBuffer = await fs.readFile(filePath);

  return new Promise((resolve, reject) => {
    kindlegen(fileBuffer, (error, mobiBuffer) => {
      if (error) {
        reject(error);
      }
      resolve(mobiBuffer);
    });
  });
};

const converters = Object.freeze([
  { extension: ".pdf", convert: pdfConverter },
  { extension: ".epub", convert: epubConverter },
  { extension: ".mobi", convert: mobiConverter },
]);

const toMobi = async (fileInfo) => {
  const { fileName } = fileInfo;
  const converter = converters.find(
    (converter) => path.extname(fileName) === converter.extension
  );
  if (!converter) {
    throw new Error("Not a valid extension");
  }
  const fileNameWithoutExtension = fileName.substr(
    0,
    fileName.lastIndexOf(".")
  );
  const mobiFileName = `${fileNameWithoutExtension}.mobi`;
  const mobiBuffer = await converter.convert(fileInfo);

  return {
    mobiBuffer,
    mobiFileName,
  };
};

module.exports = {
    toMobi,
};
