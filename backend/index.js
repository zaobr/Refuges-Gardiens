require("dotenv").config()
const express = require("express");
const app = express();

const port = process.env.APP_PORT;


app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });