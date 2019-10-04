const express = require("express");
const telegraf = require("telegraf");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const bot = new telegraf(process.env.BOT_TOKEN);
const port = process.env.PORT || 5000;

const chatbot = require("./chatbot");

bot.on("text", async ctx => {
  const { text } = ctx.update.message;
  const responses = await chatbot.textQuery(text);
  responses.forEach(element => {
    ctx.reply(element.text.text[0]);
  });
});

app.listen(port, error => {
  if (error) throw error;
});

bot.launch();
