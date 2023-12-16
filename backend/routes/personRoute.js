const express = require('express');

const {
    getPerson, createPerson, updatePerson
} = require("../controllers/personController");

const router = express.Router();

router.route("/person/:id").get(getPerson);
router.route("/person/new").post(createPerson);
router.route("/person/update").put(updatePerson);

module.exports = router;