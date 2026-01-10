const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login request received for:", req.body.username);
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, "secretkey", { expiresIn: "1d" });
    console.log("Login successful!");
    res.json({ token, username: user.username });
  } catch (err) {
    console.error("CRASH ERROR:", err.message);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
};