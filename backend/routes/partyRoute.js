const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { createParty, getParties } = require("../controllers/partyController");

const router = express.Router();

router.route("/parties").get(getParties);
router
  .route("/party/new/:id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createParty);

module.exports = router;
