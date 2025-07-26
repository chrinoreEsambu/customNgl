const prisma = require("../config/PrismaClient");

exports.messageController = async (req, res) => {
  try {
    const {
      content,
      ip,
      city,
      country,
      provider,
      browser,
      os,
      device,
      timezone,
      language,
    } = req.body;

    const newContent = await prisma.message.create({
      data: {
        content,
        ip,
        city,
        country,
        provider,
        browser,
        os,
        device,
        timezone,
        language,
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
