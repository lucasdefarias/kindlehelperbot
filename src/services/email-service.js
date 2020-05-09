const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port : config.MAIL_PORT,
  secure : config.MAIL_SECURE,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});

const sendBookToEmail = (data) => {
  const mailOptions = {
    from: 'kindlebothelper@gmail.com',
    to: config.KINDLE_MAIL,
    subject: '[Kindle Book] ' + data.fileName,
    html: '<b>Thanks for using KindleBotHelper. Enjoy the book!</b>',
    attachments: [{
      filename: data.fileName,
      content: data.fileBuffer
    }]
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
};

module.exports = {
  sendBookToEmail
};