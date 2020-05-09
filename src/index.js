const { Telegraf } = require('telegraf');
const config = require('./config');
const services = require('./services');
const useCases = require('./use-cases');
const container = {};

const init = (ctx, next) => {
  Object.keys(services).forEach(service => {
    container[service] = services[service]({ ctx });
  });
  container.ctx = ctx;
  next();
};

const app = async () => {
  const { BOT_TOKEN } = config;
  if (!BOT_TOKEN) {
    throw new Error('Missing bot token');
  }

  const bot = new Telegraf(BOT_TOKEN);
  bot.use(init);
  bot.start((ctx) => useCases.startMessageUseCase(ctx)(
    ctx.chat.first_name,
    ctx.botInfo.first_name
  ));
  bot.help((ctx) => useCases.help(ctx)());
  bot.on('message', (ctx) => {
    if (ctx.message.document) {
      return useCases
        .uploadDocumentUseCase(container)(ctx.message)
        .catch(err => ctx.reply('Error: ', err));
    }

    useCases.defaultMessage(ctx)(ctx.message);
  });

  bot.launch();
};

module.exports = {
  app
};