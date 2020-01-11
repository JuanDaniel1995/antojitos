const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const enforce = require("express-sslify");
const compression = require("compression");
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
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.post("/whatsapp", async (req, res) => {
  try {
    const { Body } = req.body;
    const {
      fulfillmentMessages,
      displayName,
      parameters
    } = await chatbot.textQuery(Body);
    const twiml = new MessagingResponse();
    switch (displayName) {
      case "welcome":
        fulfillmentMessages.forEach(element => {
          twiml.message(element.text.text[0]);
        });
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
        break;
      case "fallback":
        fulfillmentMessages.forEach(element => {
          twiml.message(element.text.text[0]);
        });
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
        break;
      case "ask.dishes":
        const dishesSnapshot = await firebase.showDishes();
        let message = "";
        await dishesSnapshot.forEach(async doc => {
          message = message.concat(
            `${doc.data().displayName} a ${doc.data().price} colones`
          );
          message = message.concat("\n");
        });
        twiml.message(message);
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
          dishSnapshot.forEach(doc => {
            twiml.message(`El costo es de ${doc.data().price} colones`);
          });
          res.writeHead(200, { "Content-Type": "text/xml" });
          res.end(twiml.toString());
        }
        break;
      default:
    }
  } catch (err) {
    console.log(err);
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
      const dishesSnapshot = await firebase.showDishes();
      let message = "";
      await dishesSnapshot.forEach(async doc => {
        message = message.concat(
          `${doc.data().displayName} a ${doc.data().price} colones`
        );
        message = message.concat("\n");
      });
      ctx.reply(message);
      break;
    case "ask.dish_price":
      const { dish } = parameters.fields;
      const dishSnapshot = await firebase.showDishPrice(dish.stringValue);
      if (dishSnapshot.empty) {
        return await ctx.reply(
          "No hemos encontrado el platillo que estás buscando, asegurate de usar el nombre completo"
        );
      } else {
        return dishSnapshot.forEach(async doc => {
          await ctx.reply(`El costo es de ${doc.data().price} colones`);
        });
      }
      break;
    default:
  }
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.listen(port, error => {
  if (error) throw error;
});

bot.launch();
