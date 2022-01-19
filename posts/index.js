const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

app.use(bodyParser.json());
const posts = {};
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // await axios.post("http://localhost:5000/events", {
  await axios.post("http://event-bus-srv:5000/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  //type ,data
  console.log("Received:POST", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("V10");
  console.log("POSTS: LISTENING ON PORT::4000");
});
