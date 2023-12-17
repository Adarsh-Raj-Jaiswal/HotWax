const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router
  .route("/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/order/:id").get(isAuthenticatedUser, getOrder);
router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/update/:id").put(isAuthenticatedUser, updateOrder);

module.exports = router;
