// import TelegramBot, { Message } from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env);

const token = process.env.TELEGRAM_KEY || "";

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg/* :Message */, match) => {
	const chatId = msg.chat.id;
	
	const resp = match ? match[1] : "NOTHIN'";

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg/* :Message */) => {
  const chatId = msg.chat.id;

	const user = msg.from.first_name;
	const text = msg.text;

	const resp = `${user}, you said this: ${text}`

  bot.sendMessage(chatId, resp);
});

/*
{
	"message_id":15,
	"from":{
		"id":7068960341,
		"is_bot":false,
		"first_name":"Jason",
		"language_code":"en"
	},
	"chat":{
		"id":7068960341,
		"first_name":"Jason",
		"type":"private"
	},
	"date":1747307686,
	"text":"hi"
}
*/