const express = require("express");
const jwt = require("jsonwebtoken");
const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth");
const router = express.Router();

router.route("/register").post((req, res) => {
  const { name, password } = req.body;

  const token = jwt.sign({ name, password }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", token, options).json({
    success: true,
    token,
  });
});

module.exports = router;
