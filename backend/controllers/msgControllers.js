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
        content: content,
        ip: ip,
        city: city,
        country: country,
        provider: rovider,
        browser: browser,
        os: os,
        device: device,
        timezone: timezone,
        language: language,
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
