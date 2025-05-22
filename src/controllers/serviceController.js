const mongoose = require("mongoose");
const Service = require("../models/serviceModel");

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services.map(s => ({
      id: s.customId,
      name: s.name,
      price: s.price,
      description: s.description,
      created_at: s.created_at,
      image:s.image
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar serviços: ${err.message}` });
  }
};

exports.getServiceById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const service = await Service.findOne({ customId: id });
    if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
    res.json({
      id: service.customId,
      name: service.name,
      price: service.price,
      description: service.description,
      created_at: service.created_at
    });
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar serviço: ${err.message}` });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: "Serviço criado com sucesso", id: service.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao criar serviço: ${err.message}` });
  }
};

exports.updateService = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const service = await Service.findOneAndUpdate({ customId: id }, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
    res.json({ message: "Serviço atualizado com sucesso" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao atualizar serviço: ${err.message}` });
  }
};

exports.deleteService = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const service = await Service.findOneAndDelete({ customId: id });
    if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
    res.json({ message: "Serviço removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: `Erro ao remover serviço: ${err.message}` });
  }
};
