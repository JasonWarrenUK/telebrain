import TelegramBot, { Message } from "node-telegram-bot-api";

require('dotenv').config();

console.log(process.env);
const token = process.env.TELEGRAM_KEY || "";

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg:Message, match) => {
  const chatId = msg.chat.id;
	
	const resp = match ? match[1] : "NOTHIN'";

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg:Message) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'uh... k');
});