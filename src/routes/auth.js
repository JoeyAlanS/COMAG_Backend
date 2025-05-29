const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/userModel"); 

router.post("/login", async (req, res) => {
  const { email, password } = req.body; 

  const user = await User.findOne({ email }); 
  if (!user) return res.status(400).json({ message: "Usuário ou senha inválidos. GAY ERROU O USER" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Usuário ou senha inválidos. GAY ERROU A SENHA" });

  // Generate JWT token
  const payload = { id: user.id, email: user.email }; 
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

module.exports = router;