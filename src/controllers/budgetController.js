const Budget = require("../models/budgetModel");

exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets.map(b => ({
      id: b.customId,
      nome: b.nome,
      email: b.email, 
      telefone: b.telefone,
      nomeEmpresa: b.nomeEmpresa,
      sedeEmpresa: b.sedeEmpresa,
      equipamento: b.equipamento,
      data: b.data,
      mensagem: b.mensagem
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar orçamentos: ${err.message}` });
  }
};

exports.getBudgetById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const budget = await Budget.findOne({ customId: id });
    if (!budget) return res.status(404).json({ error: "Orçamento não encontrado." });
    res.json({
      id: budget.customId,
      nome: budget.nome,
      email: budget.email,
      telefone: budget.telefone,
      nomeEmpresa: budget.nomeEmpresa,
      sedeEmpresa: budget.sedeEmpresa,
      equipamento: budget.equipamento,
      data: budget.data,
      mensagem: budget.mensagem
    });
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar orçamento: ${err.message}` });
  }
};

exports.createBudget = async (req, res) => {
  const { nome, email, telefone, nomeEmpresa, sedeEmpresa, equipamento, data, mensagem } = req.body;

  // Validação extra para campos obrigatórios
  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ error: "O campo 'nome' é obrigatório e não pode ser vazio." });
  }
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "O campo 'email' é obrigatório e não pode ser vazio." });
  }
  if (!telefone || typeof telefone !== "string" || telefone.trim() === "") {
    return res.status(400).json({ error: "O campo 'telefone' é obrigatório e não pode ser vazio." });
  }
  if (!nomeEmpresa || typeof nomeEmpresa !== "string" || nomeEmpresa.trim() === "") {
    return res.status(400).json({ error: "O campo 'nomeEmpresa' é obrigatório e não pode ser vazio." });
  }
  if (!sedeEmpresa || typeof sedeEmpresa !== "string" || sedeEmpresa.trim() === "") {
    return res.status(400).json({ error: "O campo 'sedeEmpresa' é obrigatório e não pode ser vazio." });
  }
  if (!equipamento || typeof equipamento !== "string" || equipamento.trim() === "") {
    return res.status(400).json({ error: "O campo 'equipamento' é obrigatório e não pode ser vazio." });
  }
  if (!data || isNaN(Date.parse(data))) {
    return res.status(400).json({ error: "O campo 'data' é obrigatório e deve ser uma data válida." });
  }
    if (!mensagem || typeof mensagem !== "string" || mensagem.trim() === "") {
    return res.status(400).json({ error: "O campo 'mensagem' é obrigatório e não pode ser vazio." });
  }

  try {
    const budget = new Budget({
      nome,
      email,
      telefone,
      nomeEmpresa,
      sedeEmpresa,
      equipamento,
      data,
      mensagem
    });
    await budget.save();
    res.status(201).json({ message: "Orçamento criado com sucesso", id: budget.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    res.status(500).json({ error: `Erro ao criar orçamento: ${err.message}` });
  }
};

exports.deleteBudget = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const budget = await Budget.findOneAndDelete({ customId: id });
    if (!budget) return res.status(404).json({ error: "Orçamento não encontrado." });
    res.json({ message: "Orçamento removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: `Erro ao remover orçamento: ${err.message}` });
  }
};