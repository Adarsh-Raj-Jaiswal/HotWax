const pool = require('../server');

exports.getPerson = async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query(`
    SELECT *
    FROM person
    WHERE party_id = ?
    `, [id]);
    res.send(rows[0]);
    res.send(id);
};
exports.createPerson = async (req, res) => {
    const body = req.body;
    res.send(body);
 };
exports.updatePerson = async (req, res) => {
    const body = req.body;
    res.send(body);
 };