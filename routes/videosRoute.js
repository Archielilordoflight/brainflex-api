const route = require("express").Router();
const { readData } = require("./../utils/heplers");
const fs = require("fs");
const crypto = require("crypto");
const { json } = require("express");

route.get("/", (req, res) => {
  const videos = readData("./data/videos.json").map((e) => {
    return { id: e.id, title: e.title, channel: e.channel, image: e.image };
  });
  res.status(200).json(videos);
});

route.get("/:videoId", (req, res) => {
  const videoDetails = readData("./data/videos.json").find(
    (e) => e.id === req.params.videoId
  );
  res.status(200).json(videoDetails);
});

route.post("/", (req, res) => {
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.query.title,
    channel: "Brainbook",
    image: "https://i.imgur.com/l2Xfgpl.jpg",
    description: req.query.description,
    views: "1,001,023",
    likes: "110,985",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        id: "091de676-61af-4ee6-90de-3a7a53af7521",
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        likes: 0,
        timestamp: 1626359541000,
      },
      {
        id: "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
  };

  const videos = readData("./data/videos.json");
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  res.status(201).json("New video uploded");
});

route.delete("/:videoId", (req, res) => {
  const videosAfterDelete = readData("./data/videos.json").filter(
    (e) => e.id !== req.params.videoId
  );
  fs.writeFileSync("./data/videos.json", JSON.stringify(videosAfterDelete));
  res.status(202).json("Deleted");
});

module.exports = route;
