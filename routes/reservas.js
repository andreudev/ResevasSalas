const express = require("express");
const {
  getReservas,
  createReservas,
  updateReservas,
  deleteReservas,
} = require("../controller/reservasController");
const router = express.Router();

router.get("/", getReservas);
router.post("/", createReservas);
router.put("/:id", updateReservas);
router.delete("/:id", deleteReservas);

module.exports = router;
