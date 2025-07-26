const argon2 = require("argon2");
const prisma = require("../config/PrismaClient");

exports.messageController = async (req, res) => {
  try {
    const { content } = req.body;

    const newContent = await prisma.message.create({
      data: {
        content: content,
      },
    });
    res.status(201).json({ message: "message envoyer", newContent });
  } catch (error) {
    res.status(500).json({
      message: "something wrong happens",
      eror: { message: error.message },
    });
  }
};
