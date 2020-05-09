module.exports = {
  BOT_TOKEN: process.env.KINDLEBOT_TOKEN,
  TELEGRAM_API_URL: process.env.TELEGRAM_API_URL || 'https://api.telegram.org',
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT || 465,
  MAIL_SECURE: process.env.MAIL_SECURE || true,
  KINDLE_MAIL: process.env.KINDLE_MAIL
};