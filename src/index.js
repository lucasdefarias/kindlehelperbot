const { Telegraf } = require('telegraf');
const config = require('./config');
const services = require('./services');
const useCases = require('./use-cases');
const container = {};

const initContainer = () => {
  Object.keys(services).forEach(service => {
    container[service] = services[service];
  });
};

const contextMiddleware = (ctx, next) => {
  container.ctx = ctx;
  next();
};

const app = async () => {
  const { BOT_TOKEN } = config;
  if (!BOT_TOKEN) {
    throw new Error('Missing bot token');
  }
  initContainer();

  const bot = new Telegraf(BOT_TOKEN);

  bot.use(contextMiddleware);
  bot.start((ctx) => useCases.startMessageUseCase(ctx)(
    ctx.chat.first_name,
    ctx.botInfo.first_name
  ));
  bot.help((ctx) => useCases.help(ctx)());
  bot.on('message', (ctx) => {
    if (ctx.message.document) {
      return useCases
        .uploadDocumentUseCase(container)(ctx.message)
        .catch(() => ctx.reply('Ha habido un error 😔'));
    }

    useCases.defaultMessage(ctx)(ctx.message);
  });

  bot.launch();
};

module.exports = {
  app
};