const prisma = require("../config/PrismaClient");
const argon2 = require("argon2");
const session = require("express-session");

exports.createUser = async (req, res) => {
  const { name, role, email, password } = req.body;

  try {
    const hachPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: 32,
      parallelism: 2,
      timeCost: 3,
      memoryCost: 2 ** 12,
    });
    const createUser = await prisma.users.create({
      data: {
        name: name,
        role: role,
        email: email,
        password: hachPassword,
      },
    });
    res.status(201).json({ message: "user creat successfully", createUser });
  } catch (error) {
    res.status(500).json({
      message: "sommething went wrong",
      error: { message: error.message },
    });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userfinder = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!userfinder) {
      return res.status(401).json({ message: "User not found" });
    }

    const compare = await argon2.verify(userfinder.password, password);

    if (compare) {
      req.session.user_id = userfinder.email;
      return res
        .status(200)
        .json({ message: "bienvenue", user: userfinder.email });
    } else {
      return res
        .status(401)
        .json({ message: "mot de passe ou email incorrect" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error during connexion",
      error: { message: error.message },
    });
  }
};
