const pool = require('../config/database')

exports.getPerson = async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query(`
    SELECT *
    FROM person
    WHERE party_id = ?
    `, [id]);
    res.send(rows[0]);
};

exports.createPerson = async (req, res) => {

    const partyId = req.params.id;
    const [rows] = await pool.query(`INSERT INTO person (PARTY_ID)VALUES (?);`
        , [partyId]);
    res.send(rows);
};

exports.updatePerson = async (req, res) => {
    const partyId = req.params.id;
    const { salutation, first_name, middle_name, last_name, gender, birth_date, marital_status, empl_status, occupation } = req.body;
    const [rows] = await pool.query(`UPDATE person
    SET
      SALUTATION = ?,
      FIRST_NAME = ?,
      MIDDLE_NAME = ?,
      LAST_NAME = ?,
      GENDER = ?,
      BIRTH_DATE = ?,
      MARITAL_STATUS_ENUM_ID = ?,
      EMPLOYMENT_STATUS_ENUM_ID = ?,
      OCCUPATION = ?
    WHERE PARTY_ID = ?
    ` , [salutation, first_name, middle_name, last_name, gender, birth_date, marital_status, empl_status, occupation,partyId]);
    res.send(rows);
};