const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/orders").get(getAllOrders);
router.route("/order/:id").get(getOrder);
router.route("/order/new").post(createOrder);
router.route("/order/update/:id").put(updateOrder);

module.exports = router;
