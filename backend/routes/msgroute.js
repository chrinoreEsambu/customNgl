const express = require("express");
const { messageController } = require("../controllers/msgControllers");
const { createUser, connexion } = require("../controllers/userControllers");
const router = express.Router();

router.post("/api/sendmessage", messageController);
router.post("/api/createUser", createUser);
router.post("/api/connexion", connexion);
module.exports = router;
