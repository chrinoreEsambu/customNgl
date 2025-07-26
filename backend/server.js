const express = require("express");
const app = express();
const path = require("path");
const {
  middleware,
  middleset,
  allowCors,
  validate,
} = require("./middleware/middleware");
require("dotenv").config();

const port = process.env.port || 5000;

app.use(middleset);
app.use(allowCors);
app.use(validate);

(async () => {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("error starting the server", error);
  }
})();
