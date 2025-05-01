const User = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: `Erro ao buscar usuários: ${err.message}` });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  User.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao buscar usuário com ID ${req.params.id}: ${err.message}` });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: `Usuário com ID ${req.params.id} não encontrado.` });
    }
    res.json(result[0]);
  });
};

exports.createUser = (req, res) => {
  User.create(req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao criar usuário: ${err.message}` });
    }
    res.status(201).json({ message: "Usuário criado com sucesso" });
  });
};

exports.updateUser = (req, res) => {
  User.update(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao atualizar usuário com ID ${req.params.id}: ${err.message}` });
    }
    res.json({ message: "Usuário atualizado com sucesso" });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao deletar usuário com ID ${req.params.id}: ${err.message}` });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  });
};
