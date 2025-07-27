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
      latitude,
      longitude,
    } = req.body;

    const newMessage = await prisma.message.create({
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
        latitude,
        longitude,
      },
    });

    res.status(201).json({
      message: "Message envoyé avec succès",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de l'envoi du message",
      error: error.message,
    });
  }
};
