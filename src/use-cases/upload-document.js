const path = require("path");

module.exports = ({ fileService, converterService, mailService, ctx }) => async (
  message
) => {
  const { document } = message;

  const documentData = await fileService.getFileData(document.file_id);
  const fileResponse = await fileService.downloadFile(documentData.file_path);

  const userDocumentsPath = path.resolve(
    __dirname,
    "../../storage/uploads",
    `${message.from.id}`
  );
  const uploadedFileName = `${document.file_unique_id}${document.file_name}`;
  const inputFilePath = await fileService.storeFile(
    fileResponse.data,
    userDocumentsPath,
    uploadedFileName
  );

  try {
    const { mobiBuffer, mobiFileName } = await converterService.toMobi({
      fileName: document.file_name,
      filePath: inputFilePath,
    });

    await mailService.sendBookToEmail({
      fileName: mobiFileName,
      fileBuffer: mobiBuffer
    });

    ctx.reply(`¡Tu libro ${mobiFileName} se ha enviado correctamente! 👍`);
  } catch (e) {
    ctx.reply(`Ha habido un problema al procesar el documento: ${e.message}`);
  }
};
