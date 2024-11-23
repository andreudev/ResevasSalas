let salas = [];

const getSalas = (req, res) => res.json(salas);

const createSalas = (req, res) => {
  const { nombre, capacidad, estado } = req.body;
  if (!nombre || !capacidad || !estado) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const id = salas.length + 1;
  const sala = { nombre, capacidad, estado, id };
  salas.push(sala);
  res.status(201).json(sala);
};

const updateSalas = (req, res) => {
  // url: localhost:3000/salas/1
  const { id } = req.params;
  const { nombre, capacidad, estado } = req.body;
  const sala = salas.find((sala) => sala.id === parseInt(id));
  if (!sala) {
    return res.status(404).json({ error: "Sala no encontrada" });
  }
  sala.nombre = nombre;
  sala.capacidad = capacidad;
  sala.estado = estado;
  res.json(sala);
};

const deleteSalas = (req, res) => {
  const { id } = req.params;
  salas = salas.filter((sala) => sala.id !== parseInt(id));
  res.json({ message: "Sala eliminada" });
};

module.exports = { getSalas, createSalas, updateSalas, deleteSalas };
