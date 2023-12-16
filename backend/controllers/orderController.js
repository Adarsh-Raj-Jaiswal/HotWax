const pool = require("../config/database");

exports.getAllOrders = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT *
    FROM order_header`);
  res.send(rows);
};

exports.getOrder = async (req, res) => {
  const order_id = req.params.id;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_header
    WHERE order_id = ?`,
    [order_id]
  );
  res.send(rows);
};
exports.createOrder = async (req, res) => {
  const {
    order_id,
    order_name,
    placed_date,
    aprv_date,
    status_id,
    currency,
    prod_store_id,
    sales_channel,
    grand_total,
    completed_date,
  } = req.body;

  const [rows] = await pool.query(
    `INSERT INTO order_header 
    (ORDER_ID, ORDER_NAME, PLACED_DATE, APPROVED_DATE, STATUS_ID, CURRENCY_UOM_ID, PRODUCT_STORE_ID, SALES_CHANNEL_ENUM_ID, GRAND_TOTAL, COMPLETED_DATE)
     VALUES(?,?,?,?,?,?,?,?,?,?)`,
    [
      order_id,
      order_name,
      placed_date,
      aprv_date,
      status_id,
      currency,
      prod_store_id,
      sales_channel,
      grand_total,
      completed_date,
    ]
  );
  res.send(rows);
};

exports.updateOrder = async () => {};
