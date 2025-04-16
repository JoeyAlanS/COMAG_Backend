const Service = require("../models/serviceModel");

exports.getAllServices = (req, res) => {
  Service.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getServiceById = (req, res) => {
  Service.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.createService = (req, res) => {
  Service.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Serviço criado com sucesso" });
  });
};

exports.updateService = (req, res) => {
  Service.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Serviço atualizado com sucesso" });
  });
};

exports.deleteService = (req, res) => {
  Service.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Serviço removido com sucesso" });
  });
};
