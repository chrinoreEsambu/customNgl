const express = require("express");
const { messageController } = require("../controllers/msgControllers");
const { createUser, connexion } = require("../controllers/userControllers");
const { usersession, validate } = require("../middleware/middleware");
const router = express.Router();

router.post("/api/sendmessage", messageController);
router.post("/api/createUser", createUser);
router.post("/api/connexion", validate, usersession, connexion);
module.exports = router;
