const { BOT_TOKEN, TELEGRAM_API_URL } = require("../config");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getFileData = async (fileId) => {
  return this.ctx.telegram.getFile(fileId);
};

const downloadFile = async (filePath) =>
  await axios({
    url: `${TELEGRAM_API_URL}/file/bot${BOT_TOKEN}/${filePath}`,
    method: "GET",
    responseType: "stream",
  });

const storeFile = async (fileData, destinationPath, fileName) => {
  const pathExists = fs.existsSync(destinationPath);
  if (!pathExists) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
  const filePath = path.resolve(destinationPath, fileName);
  const writer = fs.createWriteStream(filePath);
  fileData.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
};

module.exports = (ctx) => {
  this.ctx = ctx;

  return {
    getFileData: getFileData.bind(this),
    downloadFile,
    storeFile,
  };
};
