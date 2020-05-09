const Path = require('path');

module.exports = ({ fileService }) => async (message) => {
    const { document } = message;

    const documentData = await fileService.getFileData(document.file_id);
    const fileResponse = await fileService.downloadFile(documentData.file_path);
    
    const userDocumentsPath = Path.resolve(__dirname, '../../storage/documents', `${message.from.id}`);
    await fileService.storeFile(
        fileResponse, 
        userDocumentsPath, 
        `${document.file_unique_id}${document.file_name}`
    );
   
    // TODO Convert file to mobi

    // TODO Send to kindle email

    // TODO Send notification
};
