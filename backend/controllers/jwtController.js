const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const [value] = await pool.query(`SELECT * FROM user WHERE email = ?`, [
    email,
  ]);
  const user = value[0];
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if (password != user.password) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie("token", token, options).send(user);
});

exports.logout = catchAsyncErrors(async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
});

exports.register = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const [user] = await pool.query(
    `INSERT INTO user (email,password,role) VALUES (?,?,'user')`,
    [email, password]
  );

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(201).cookie("token", token, options).send(user);
});
