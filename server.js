const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir el frontend desde la carpeta public
app.use(express.static("public"));

// Rutas de la API
const salasRoutes = require("./routes/salas");
const reservasRoutes = require("./routes/reservas");

app.use("/salas", salasRoutes);
app.use("/reservas", reservasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Frontend disponible en http://localhost:${PORT}/`);
});
