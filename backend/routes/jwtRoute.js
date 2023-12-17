const express = require("express");

const { login, logout, register } = require("../controllers/jwtController");

const router = express.Router();

router.route("/logout").get(logout);
router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;
