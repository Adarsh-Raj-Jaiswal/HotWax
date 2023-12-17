const pool = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAllOrders = catchAsyncErrors(async (req, res) => {
  const [Orders] = await pool.query(`SELECT * FROM order_header`);
  const Length = Orders.length;
  res.send({
    Length,
    Orders,
  });
});

exports.getOrder = catchAsyncErrors(async (req, res) => {
  const order_id = req.params.id;
  const [rows] = await pool.query(
    `SELECT * FROM order_header WHERE order_id = ?`,
    [order_id]
  );
  const order = rows[0];
  delete order.ORDER_ID;
  res.send(order);
});

exports.createOrder = catchAsyncErrors(async (req, res) => {
  const {
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

  const d = new Date();
  const order_id =
    "" +
    d.getDate() +
    "" +
    (d.getMonth() + 1) +
    "" +
    d.getFullYear() +
    "" +
    d.getHours() +
    "" +
    d.getMinutes() +
    "" +
    d.getSeconds();

  const [rows] = await pool.query(
    `INSERT INTO order_header
    (ORDER_ID, ORDER_NAME, PLACED_DATE, APPROVED_DATE, STATUS_ID, CURRENCY_UOM_ID,
    PRODUCT_STORE_ID, SALES_CHANNEL_ENUM_ID, GRAND_TOTAL, COMPLETED_DATE)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
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
});

exports.updateOrder = catchAsyncErrors(async (req, res) => {
  const order_id = req.params.id;
  const {
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
    `UPDATE order_header SET
    ORDER_NAME=?,PLACED_DATE=?,APPROVED_DATE=?,STATUS_ID=?,CURRENCY_UOM_ID=?,PRODUCT_STORE_ID=?,
    SALES_CHANNEL_ENUM_ID=?,GRAND_TOTAL=?,COMPLETED_DATE=? WHERE order_id=?`,
    [
      order_name,
      placed_date,
      aprv_date,
      status_id,
      currency,
      prod_store_id,
      sales_channel,
      grand_total,
      completed_date,
      order_id,
    ]
  );
  res.send(rows);
});
