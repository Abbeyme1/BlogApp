const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const commentsByPostId = {};

app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;

  await axios.post("http://event-bus-srv:5000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received:COMMENTS", type);
  if (req.body.type === "CommentModerated") {
    const { id, content, postId, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    comment.status = status;

    await axios.post("http://event-bus-srv:5000/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("COMMENTS: LISTENING ON PORT::4001");
});
