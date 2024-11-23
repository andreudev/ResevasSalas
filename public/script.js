// URL base para las APIs
const BASE_URL = "http://localhost:3000";

// Referencias a elementos del DOM
const salaForm = document.getElementById("sala-form");
const reservaForm = document.getElementById("reserva-form");
const salasLista = document.getElementById("salas-lista");
const reservasLista = document.getElementById("reservas-lista");
const reservaSalaSelect = document.getElementById("reserva-sala");

// Cargar datos iniciales
document.addEventListener("DOMContentLoaded", () => {
  cargarSalas();
  cargarReservas();
});

// Función para cargar salas
async function cargarSalas() {
  try {
    const res = await fetch(`${BASE_URL}/salas`);
    const salas = await res.json();

    salasLista.innerHTML = ""; // Limpiar lista
    reservaSalaSelect.innerHTML = ""; // Limpiar select

    salas.forEach((sala) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${sala.nombre}</strong> (Capacidad: ${sala.capacidad}, Estado: ${sala.estado})
        <button onclick="editarSala(${sala.id})">Editar</button>
        <button onclick="eliminarSala(${sala.id})">Eliminar</button>
      `;
      salasLista.appendChild(li);

      // Agregar opción al select de reservas
      const option = document.createElement("option");
      option.value = sala.id;
      option.textContent = sala.nombre;
      reservaSalaSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error cargando salas:", error);
  }
}

// Función para cargar reservas
async function cargarReservas() {
  try {
    const res = await fetch(`${BASE_URL}/reservas`);
    const reservas = await res.json();

    reservasLista.innerHTML = ""; // Limpiar lista

    reservas.forEach((reserva) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${reserva.nombre}</strong> - Sala: ${reserva.salaId}, 
        Desde: ${new Date(reserva.fechaInicio).toLocaleString()}, 
        Hasta: ${new Date(reserva.fechaFin).toLocaleString()}
        <button onclick="editarReserva(${reserva.id})">Editar</button>
        <button onclick="eliminarReserva(${reserva.id})">Eliminar</button>
      `;
      reservasLista.appendChild(li);
    });
  } catch (error) {
    console.error("Error cargando reservas:", error);
  }
}

// Función para manejar el envío del formulario de salas
salaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("sala-id").value;
  const nombre = document.getElementById("sala-nombre").value;
  const capacidad = document.getElementById("sala-capacidad").value;
  const estado = document.getElementById("sala-estado").value;

  const sala = { nombre, capacidad, estado };

  try {
    if (id) {
      // Editar sala existente
      await fetch(`${BASE_URL}/salas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sala),
      });
    } else {
      // Crear nueva sala
      await fetch(`${BASE_URL}/salas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sala),
      });
    }

    salaForm.reset(); // Limpiar formulario
    cargarSalas();
  } catch (error) {
    console.error("Error guardando sala:", error);
  }
});

// Función para manejar el envío del formulario de reservas
reservaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("reserva-id").value;
  const salaId = document.getElementById("reserva-sala").value;
  const nombre = document.getElementById("reserva-nombre").value;
  const fechaInicio = document.getElementById("reserva-inicio").value;
  const fechaFin = document.getElementById("reserva-fin").value;

  const reserva = { salaId, nombre, fechaInicio, fechaFin };

  try {
    if (id) {
      // Editar reserva existente
      await fetch(`${BASE_URL}/reservas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });
    } else {
      // Crear nueva reserva
      await fetch(`${BASE_URL}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva),
      });
    }

    reservaForm.reset(); // Limpiar formulario
    cargarReservas();
  } catch (error) {
    console.error("Error guardando reserva:", error);
  }
});

// Función para editar una sala
async function editarSala(id) {
  try {
    const res = await fetch(`${BASE_URL}/salas/${id}`);
    const sala = await res.json();

    document.getElementById("sala-id").value = sala.id;
    document.getElementById("sala-nombre").value = sala.nombre;
    document.getElementById("sala-capacidad").value = sala.capacidad;
    document.getElementById("sala-estado").value = sala.estado;
  } catch (error) {
    console.error("Error cargando sala para editar:", error);
  }
}

// Función para editar una reserva
async function editarReserva(id) {
  try {
    const res = await fetch(`${BASE_URL}/reservas/${id}`);
    const reserva = await res.json();

    document.getElementById("reserva-id").value = reserva.id;
    document.getElementById("reserva-sala").value = reserva.salaId;
    document.getElementById("reserva-nombre").value = reserva.nombre;
    document.getElementById("reserva-inicio").value = reserva.fechaInicio;
    document.getElementById("reserva-fin").value = reserva.fechaFin;
  } catch (error) {
    console.error("Error cargando reserva para editar:", error);
  }
}

// Función para eliminar una sala
async function eliminarSala(id) {
  try {
    await fetch(`${BASE_URL}/salas/${id}`, { method: "DELETE" });
    cargarSalas();
  } catch (error) {
    console.error("Error eliminando sala:", error);
  }
}

// Función para eliminar una reserva
async function eliminarReserva(id) {
  try {
    await fetch(`${BASE_URL}/reservas/${id}`, { method: "DELETE" });
    cargarReservas();
  } catch (error) {
    console.error("Error eliminando reserva:", error);
  }
}
