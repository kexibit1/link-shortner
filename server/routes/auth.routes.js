const router = require("express").Router();
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = schema.validate({ email, password });
    if (error) {
      console.log("Ошибка валидации", error);
      return res.status(400).json({ message: error.details[0].message });
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
      console.log("Ошибка кандидат найден");
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User have been created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again later" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = schema.validate({ email, password });

  if (error) {
    console.log("Ошибка", error);
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log("Ошибка не найден пользователь");
    return res.status(400).json({ message: "Email or Password is wrong" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Ошибка не авторизован пароль");
    return res.status(400).json({ message: "Email or Password is wrong" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, userId: user.id });
});

module.exports = router;
