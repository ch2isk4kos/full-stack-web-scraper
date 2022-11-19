const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { scrapeWebpage } = require("./scrapers.js");
require("dotenv").config();

const PORT = process.env.PORT;
const MDB = process.env.MONGO_URI;

// MIDDLEWARE
// app.use(cors);
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
    { name: "Pat Mcafee Show", img: "http://" },
    { name: "Tape Don't Lie: Raiders Podcast", img: "http://" },
    { name: "New York Knicks", img: "http://" },
  ];

  // @TODO: GET from db

  res.send(creators);
});

app.post("/creators", async (req, res) => {
  console.log("req.body:", req.body);
  // scrape user input url
  const data = await scrapeWebpage(req.body.userInput);
  console.log("data:", { data });
  // @TODO: add to db
  res.send("Success!");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
