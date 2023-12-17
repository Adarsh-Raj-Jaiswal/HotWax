const express = require("express");

const { createParty, getParties } = require("../controllers/partyController");

const router = express.Router();

router.route("/parties").get(getParties);
router.route("/party/new/:id").post(createParty);

module.exports = router;
