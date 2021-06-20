const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("red") ? "rejected" : "approved";

    await axios.post("http://localhost:5000/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });

    res.send({ status: "DONE!" });
  }
});

app.listen(4003, () => {
  console.log("MODERATOR: LISTENING TO PORT::4003");
});
