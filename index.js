const express = require("express");
const telegraf = require("telegraf");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const bot = new telegraf(process.env.BOT_TOKEN);
const port = process.env.PORT || 5000;

const chatbot = require("./chatbot");
const firebase = require("./firebase");

bot.command("start", async ctx => {
  const { fulfillmentMessages } = await chatbot.eventQuery("Welcome");
  return fulfillmentMessages.forEach(async element => {
    await ctx.reply(element.text.text[0]);
  });
});

bot.on("text", async ctx => {
  const { text } = ctx.update.message;
  const {
    fulfillmentMessages,
    displayName,
    parameters
  } = await chatbot.textQuery(text);
  switch (displayName) {
    case "welcome":
      return fulfillmentMessages.forEach(async element => {
        await ctx.reply(element.text.text[0]);
      });
      break;
    case "fallback":
      return fulfillmentMessages.forEach(async element => {
        await ctx.reply(element.text.text[0]);
      });
      break;
    case "ask.dishes":
      ctx.reply("En un momento te muestro el menu");
      const dishesSnapshot = await firebase.showDishes();
      return dishesSnapshot.forEach(async doc => {
        await ctx.reply(
          `${doc.data().displayName} a ${doc.data().price} colones`
        );
      });
      break;
    case "ask.dish_price":
      const { dish } = parameters.fields;
      const dishSnapshot = await firebase.showDishPrice(dish.stringValue);
      return dishSnapshot.forEach(async doc => {
        await ctx.reply(`El costo es de ${doc.data().price} colones`);
      });
      break;
    default:
  }
});

app.listen(port, error => {
  if (error) throw error;
});

bot.launch();
