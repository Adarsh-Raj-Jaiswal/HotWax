const pool = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.getPersons = catchAsyncErrors(async (req, res) => {
  const [Persons] = await pool.query(`SELECT * FROM person`);
  const Length = Persons.length;
  res.status(200).send({
    Length,
    Persons,
  });
});

exports.getPerson = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query(`SELECT * FROM person WHERE party_id = ?`, [
    id,
  ]);
  res.status(200).send(rows[0]);
});

exports.createPerson = catchAsyncErrors(async (req, res) => {
  const partyId = req.params.id;
  const [rows] = await pool.query(`INSERT INTO person (PARTY_ID)VALUES (?);`, [
    partyId,
  ]);
  sendToken(rows, 201, res);
});

exports.updatePerson = catchAsyncErrors(async (req, res) => {
  const partyId = req.params.id;
  const {
    SALUTATION,
    FIRST_NAME,
    MIDDLE_NAME,
    LAST_NAME,
    GENDER,
    BIRTH_DATE,
    MARITAL_STATUS,
    EMPL_STATUS,
    OCCUPATION,
  } = req.body;
  const [rows] = await pool.query(
    `UPDATE person SET SALUTATION = ?,FIRST_NAME = ?,MIDDLE_NAME = ?,LAST_NAME = ?,GENDER = ?,BIRTH_DATE = ?,MARITAL_STATUS_ENUM_ID = ?,EMPLOYMENT_STATUS_ENUM_ID = ?,OCCUPATION = ? WHERE PARTY_ID = ?`,
    [
      SALUTATION,
      FIRST_NAME,
      MIDDLE_NAME,
      LAST_NAME,
      GENDER,
      BIRTH_DATE,
      MARITAL_STATUS,
      EMPL_STATUS,
      OCCUPATION,
      partyId,
    ]
  );
  res.status(200).send(rows);
});
