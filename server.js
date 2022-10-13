const express = require("express");
const app = express();
const videosRoute = require("./routes/videosRoute");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(cors());
app.use("/videos", videosRoute);

app.listen(port, () => {
  console.log("running");
});
