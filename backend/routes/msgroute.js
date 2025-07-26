const express = require("express");
const { messageController } = require("../controllers/msgControllers");
const router = express.Router();

router.post("/api/sendmessage", messageController);
