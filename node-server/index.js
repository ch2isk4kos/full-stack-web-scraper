const crypto = require("crypto");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { scrapeWebpage } = require("./scrapers.js");
const Creator = require("./models/creator.js");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MDB = process.env.MONGO_URI;

const client = new MongoClient(MDB);
console.log({ client });

mongoose.connect(MDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MIDDLEWARE
app.use(bodyParser.json()); // extract json from body of request
// disable security rules for local development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/creators", async (req, res) => {
  const creators = [
    { id: "0", name: "Pat Mcafee Show", img: "http://" },
    { id: "1", name: "Tape Don't Lie: Raiders Podcast", img: "http://" },
    { id: "2", name: "New York Knicks", img: "http://" },
  ];

  // @TODO: GET from db

  res.send(creators);
});

app.post("/creators", async (req, res) => {
  console.log("req.body:", req.body);

  // scrape user input url
  const data = await scrapeWebpage(req.body.userInput);
  console.log({ data });

  // @TODO: add to db
  try {
    client.connect();
    console.log("Connected to MongoDB");

    const creator = new Creator();
    creator.id = crypto.randomUUID;
    creator.handle = data.name;
    creator.img = data.img;
    console.log({ creator });

    creator.save((err, c) => {
      if (err) console.log(`SAVE ERROR: ${err}`);
      res.send(`Creator ${creator.id} saved`);
    });
  } catch (err) {
    console.log({ err });
  }
  //   res.send("Success!");
  client.close();
  console.log("Disconnected from MongoDB");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  //   try {
  //     client.connect();
  //     console.log("Connected to MongoDB");
  //   } catch (err) {
  //     console.log(err);
  //   }
});
