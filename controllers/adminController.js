const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const pagination = require("../utils/pagination");

const adminControllers = {
  dashboard: async (req, res) => {
    try {
      const totalOrder = await Order.find()
        .populate({
          path: "customerId",
        })
        .sort({ createdAt: -1 });
      const totalCustomer = await User.find({ member: true }).sort({
        createdAt: -1,
      });
      const products = await Product.find();
      const totalProduct = products.reduce(
        (total, item) => total + item.stock,
        0
      );
      const ordersSuccess = await Order.find({ status: 4 });
      const revenue = ordersSuccess.reduce(
        (total, item) => total + item.total_price,
        0
      );
      const newOrders = pagination(1, 5, totalOrder);
      const newCustomers = pagination(1, 5, totalCustomer);

      res.status(200).json({
        data: {
          totalOrder: totalOrder.length,
          totalCustomer: totalCustomer.length,
          totalProduct,
          revenue,
          newOrders,
          newCustomers,
        },
        message: "ok",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "lỗi server" });
    }
  },
};

module.exports = adminControllers;