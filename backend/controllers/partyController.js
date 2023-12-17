const pool = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getParties = catchAsyncErrors(async (req, res) => {
  const [Parties] = await pool.query(`SELECT * FROM party`);
  const Lenght = Parties.length;
  res.send({
    Lenght,
    Parties,
  });
});

exports.createParty = catchAsyncErrors(async (req, res) => {
  const party_id = req.params.id;
  const [rows] = await pool.query(`INSERT INTO party (party_id) VALUES (?)`, [
    party_id,
  ]);
  res.send(rows);
});
