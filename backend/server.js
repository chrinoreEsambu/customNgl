const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
require("dotenv").config();


const port = process.env.port || 5000;

(async () => {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("error starting the server", error);
  }
})();
