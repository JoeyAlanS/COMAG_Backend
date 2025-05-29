const mongoose = require("mongoose");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users.map(u => ({
      id: u.customId,
      name: u.name,
      email: u.email, // Ensure email is used here
      password: u.password,
      role: u.role,
      created_at: u.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar usuários: ${err.message}` });
  }
};

exports.getUserById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const user = await User.findOne({ customId: id }, "-password");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    res.json({
      id: user.customId,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    });
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar usuário: ${err.message}` });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso", id: user.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao criar usuário: ${err.message}` });
  }
};

exports.updateUser = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const user = await User.findOneAndUpdate({ customId: id }, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao atualizar usuário: ${err.message}` });
  }
};

exports.deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const user = await User.findOneAndDelete({ customId: id });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: `Erro ao deletar usuário: ${err.message}` });
  }
};
