import TelegramBot /*, { Message } */ from "node-telegram-bot-api";
import dotenv from "dotenv";
import { getVest } from "./rag.js";

dotenv.config();
const token = process.env.TELEGRAM;
if (!token) {
	throw new Error("TELEGRAM_KEY is not set in the .env file");
} else {
	console.log("Telegram token loaded");
}

const bot = new TelegramBot(token, {polling: true});
bot.setMyCommands([
  { command: "start", description: "Starts the bot" },
	{ command: "code", description: "Show the repo" },
	{ command: "vest", description: "Get a vest recommendation. Type your requirements after the command." }
]);

bot.onText(/\/start/, (msg) => {
	const user = msg.from.first_name;

  bot.sendMessage(msg.chat.id, `Oh fuck. ${user}. It's you.`, {
		"reply_markup": {
			"keyboard": [
				["Hi", "/code"],
				["/vest"],
				// ["I'm robot"]
			]
		}
	});
});

bot.onText(/\/code/, (msg) => {
	const chatId = msg.chat.id;
	const user = msg.from.first_name;
	const repo = "https://github.com/JasonWarrenUK/telebrain";

	const resp = `Oh. You want to see me... naked? Well, alright ${user}. Here it is. ${repo}`;

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/vest/, async (msg) => {
	const chatId = msg.chat.id;
	const user = msg.from.first_name;
	bot.sendMessage(chatId, `${user}, you weird fuck, I hear you. Let me think.`);

	const resp = await getVest(msg.text);

  bot.sendMessage(chatId, `For you... ${resp}`);
})

bot.on("message", (msg) => {
  const text = msg.text || "";
  if (text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const user = msg.from.first_name;
  const resp = `${user}, you said this: ${text}`;

  bot.sendMessage(chatId, resp);
});

process.on("SIGINT", () => {
  console.log("BORED. Bye.");

  bot.stopPolling()
		.then(() => process.exit(0));
});