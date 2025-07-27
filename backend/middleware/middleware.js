const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

exports.middleset = require("express").json();

const allowOrigin = [
  "https://n95rp9vf-5173.euw.devtunnels.ms",
  "http://localhost:5173",
];

exports.allowCors = app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
  })
);

exports.usersession = session({
  secret: "votre_clef_secrete_supersecrete",
  resave: false,
  sameSite: "lax",
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    // maxAge: 1000 * 60 * 60,
  },
});
exports.validate = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Format d'email invalide" });
  }

  next();
};

exports.schekrole = async (req, res, next) => {
  try {
    const role = req.session?.role;
    if (!role || role.toLowerCase() !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès réservé aux administrateurs" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: { message: error.message },
    });
  }
};
