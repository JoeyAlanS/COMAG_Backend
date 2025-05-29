const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido ou malformado." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err.message); 
    res.status(403).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = authenticateToken;