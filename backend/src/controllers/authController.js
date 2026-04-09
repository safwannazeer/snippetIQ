const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const register = async (req, res, next) => {
  try {
    const { name, email, password} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw Object.assign(new Error("User already exists. Login instead"), {
        status: 400,
        code: "USER_EXISTS",
      });

    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    const user = await User.create({ name, email, passwordHash});
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Object.assign(new Error("Email and password are required"), {
        status: 400,
        code: "MISSING_FIELDS",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Object.assign(new Error("User doesn't exist. Register First"), {
        status: 400,
        code: "INVALID_CREDENTIALS",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw Object.assign(new Error("Invalid credentials"), {
        status: 400,
        code: "INVALID_CREDENTIALS",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { register, login };