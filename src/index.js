const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = require('./config');
const useCases = require('./use-cases');
const {fileService} = require('./services');

const app = async () => {
  const bot = new Telegraf(BOT_TOKEN);
  bot.start((ctx) => useCases.startMessageUseCase(ctx)(
    ctx.chat.first_name, 
    ctx.botInfo.first_name
  ));
  bot.help((ctx) => useCases.help(ctx)());
  bot.on('message', (ctx) => {
    if (ctx.message.document) {
      return useCases.uploadDocumentUseCase({fileService: fileService(ctx.telegram)})(ctx.message);
    }

    useCases.defaultMessage(ctx)(ctx.message);
  });
  bot.launch();
};

module.exports = {
  app
};