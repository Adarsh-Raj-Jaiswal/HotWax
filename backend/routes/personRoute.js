const express = require('express');

const {
    getPerson, createPerson, updatePerson
} = require("../controllers/personController");

const router = express.Router();

router.route("/person/:id").get(getPerson);
router.route("/person/new/:id").post(createPerson);
router.route("/person/update/:id").put(updatePerson);

module.exports = router;