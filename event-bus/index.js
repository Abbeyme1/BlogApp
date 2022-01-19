const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();
app.use(bodyParser.json());
const events = [];
// app.use(cors());

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  // axios.post("http://localhost:4000/events", event); //posts
  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event); // comments
  axios.post("http://query-srv:4002/events", event); // query
  axios.post("http://moderation-srv:4003/events", event); // moderator

  res.send({ status: "DONE!" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(5000, () => {
  console.log("EVENTBUS: LISTENING ON PORT::5000");
});
