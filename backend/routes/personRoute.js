const express = require("express");

const {
  getPerson,
  createPerson,
  updatePerson,
  getPersons,
} = require("../controllers/personController");

const router = express.Router();

router.route("/person/:id").get(getPerson);
router.route("/persons").get(getPersons);
router.route("/person/new/:id").post(createPerson);
router.route("/person/update/:id").put(updatePerson);

module.exports = router;
