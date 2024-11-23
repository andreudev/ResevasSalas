let reservas = [];

const getReservas = (req, res) => res.json(reservas);

const createReservas = (req, res) => {
  const { salaId, nombre, fechaInicio, fechaFin } = req.body;
  if (!salaId || !nombre || !fechaInicio || !fechaFin) {
    return res.status(400).json({ error: "Faltan datos", body: req.body });
  }
  const id = reservas.length + 1;
  const reserva = { id, salaId, nombre, fechaInicio, fechaFin };
  reservas.push(reserva);
  res.status(201).json(reserva);
};

const updateReservas = (req, res) => {
  // url: localhost:3000/reservas/1
  const { id } = req.params;
  const { salaId, nombre, fechaInicio, fechaFin } = req.body;
  const reserva = reservas.find((reserva) => reserva.id === parseInt(id));
  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }
  reserva.salaId = salaId;
  reserva.nombre = nombre;
  reserva.fechaInicio = fechaInicio;
  reserva.fechaFin = fechaFin;
  res.json(reserva);
};

const deleteReservas = (req, res) => {
  const { id } = req.params;
  reservas = reservas.filter((reserva) => reserva.id !== parseInt(id));
  res.json({ message: "Reserva eliminada" });
};

module.exports = {
  getReservas,
  createReservas,
  updateReservas,
  deleteReservas,
};
