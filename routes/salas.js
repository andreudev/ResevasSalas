const express = require("express");
const {
  getSalas,
  createSalas,
  updateSalas,
  deleteSalas,
} = require("../controller/salasController");
const router = express.Router();

router.get("/", getSalas);
router.post("/", createSalas);
router.put("/:id", updateSalas);
router.delete("/:id", deleteSalas);

module.exports = router;
