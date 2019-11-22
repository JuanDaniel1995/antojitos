const express = require("express");
const bodyParser = require("body-parser");
const telegraf = require("telegraf");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const bot = new telegraf(process.env.BOT_TOKEN);
const port = process.env.PORT || 5000;

const chatbot = require("./chatbot");
const firebase = require("./firebase");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/whatsapp", async (req, res) => {
  const { Body } = req.body;
  const {
    fulfillmentMessages,
    displayName,
    parameters
  } = await chatbot.textQuery(Body);
  const twiml = new MessagingResponse();
  console.log(displayName);
  switch (displayName) {
    case "welcome":
      await fulfillmentMessages.forEach(async element => {
        return twiml.message(element.text.text[0]);
      });
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
      break;
    case "fallback":
      await fulfillmentMessages.forEach(async element => {
        return twiml.message(element.text.text[0]);
      });
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
      break;
    case "ask.dishes":
      twiml.message("En un momento te muestro el menu");
      const dishesSnapshot = await firebase.showDishes();
      await dishesSnapshot.forEach(async doc => {
        return twiml.message(
          `${doc.data().displayName} a ${doc.data().price} colones`
        );
      });
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
      break;
    case "ask.dish_price":
      const { dish } = parameters.fields;
      const dishSnapshot = await firebase.showDishPrice(dish.stringValue);
      if (dishSnapshot.empty) {
        const twiml = new MessagingResponse();
        twiml.message(
          "No hemos encontrado el platillo que estás buscando, asegurate de usar el nombre completo"
        );
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      } else {
        await dishSnapshot.forEach(async doc => {
          return twiml.message(`El costo es de ${doc.data().price} colones`);
        });
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }
      break;
    default:
  }
});

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
      if (dishSnapshot.empty)
        return await ctx.reply(
          "No hemos encontrado el platillo que estás buscando, asegurate de usar el nombre completo"
        );
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
