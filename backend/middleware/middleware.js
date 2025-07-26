const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

exports.middleware = app.use(express.json());

const allowOrigin = [
  "https://n95rp9vf-5173.euw.devtunnels.ms",
  "http://localhost:5173",
];
