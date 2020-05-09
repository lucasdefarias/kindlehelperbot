const { BOT_TOKEN, TELEGRAM_API_URL } = require('../config');
const axios = require('axios');
const fs = require('fs');
const Path = require('path');

const getFileData = async (fileId) => {
    return this.telegram.getFile(fileId);
};

const downloadFile = async (filePath) => await axios({
    url: `${TELEGRAM_API_URL}/file/bot${BOT_TOKEN}/${filePath}`,
    method: 'GET',
    responseType: 'stream'
});

const storeFile = async (fileResponse, path, fileName) => {
    const pathExists = fs.existsSync(path);
    if (!pathExists) {
        fs.mkdirSync(path, { recursive: true });
    }
    const writer = fs.createWriteStream(Path.resolve(path, fileName));
    fileResponse.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    });
}

const convertFileToMobi = file => {
  // TODO
};

module.exports = (telegram) => {
    this.telegram = telegram;

    return {
        getFileData: getFileData.bind(this),
        downloadFile,
        storeFile,
        convertFileToMobi,
    }
};