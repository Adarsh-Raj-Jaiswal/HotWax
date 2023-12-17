const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  getPerson,
  createPerson,
  updatePerson,
  getPersons,
} = require("../controllers/personController");

const router = express.Router();

router
  .route("/persons")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getPersons);
router.route("/person/:id").get(isAuthenticatedUser, getPerson);
router.route("/person/update/:id").put(isAuthenticatedUser, updatePerson);
router.route("/person/new/:id").post(createPerson);

module.exports = router;
