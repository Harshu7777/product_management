const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exists. please Login...." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();

    user.refreshToken = RefreshToken;
    await user.save();

    res.cookie("AccessToken", AccessToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      AccessToken,
      RefreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error...",
    });
  }
});
exports.loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await userExist.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const AccessToken = await userExist.generateAccessToken();
    const RefreshToken = await userExist.generateRefreshToken();

    userExist.refreshToken = RefreshToken;
    await userExist.save();

    res.cookie("AccessToken", AccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookie("RefreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      },
      AccessToken,
      RefreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error...",
    });
  }
});

exports.logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");
    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error...",
    });
  }
});


