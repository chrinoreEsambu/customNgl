const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/msgroute");
const {
  middleset,
  allowCors,
  validate,
  schekrole,
  usersession,
} = require("./middleware/middleware");
require("dotenv").config();

app.use(middleset);
app.use(allowCors);
app.use(router);
app.use(usersession);

app.use(validate);
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
