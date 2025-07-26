const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

exports.middleset = app.use(express.json());

const allowOrigin = [
  "https://n95rp9vf-5173.euw.devtunnels.ms",
  "http://localhost:5173",
];

exports.allowCors= app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
  })
);




exports.validate = async (req, res, next) => {
  const { nom, mail, password, role } = req.body;
  if (!nom || !mail || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return res.status(400).json({ message: "Format d'email invalide" });
  }
  if (role && role !== "admin" && role !== "users") {
    return res
      .status(400)
      .json({ message: "Rôle invalide. Choisissez 'admin' ou 'users'" });
  }
  next();
};