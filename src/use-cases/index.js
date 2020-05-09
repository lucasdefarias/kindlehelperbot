const startMessageUseCase = require('./start');
const uploadDocumentUseCase = require('./upload-document');
const help = require('./help')
const defaultMessage = require('./default-message');

module.exports = {
    startMessageUseCase,
    uploadDocumentUseCase,
    help,
    defaultMessage
};