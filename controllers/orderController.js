const User = require("../models/User");
const Order = require("../models/Order");
const Product = require('../models/Product');

const pagination = require("../utils/pagination");
const orderControllers = {
  postOrderUser: async (req, res) => {
    const cart = req.body.cart;
    try {
      const newOrder = await new Order({
        customerId: req.user.id,
        cartItems: req.body.cart,
        total_product: req.body.totalProduct,
        total_price: req.body.totalPrice,
        shipping: req.body.shipping,
        payment: req.body.payment,
      });
      newOrder.save();

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          member: true,
        }
      );

      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOneAndUpdate(
          { _id: cart[i].productId },
          {
            $inc: {
              sold: parseInt(cart[i].quantity),
              stock: -parseInt(cart[i].quantity),
            },
          }
        );
      }

      res.status(200).json({message:"Đặt hàng thành công"});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Đặt hàng không thành công"});
    }
  },
  getAllOrderUser: async (req, res) => {
    try {
      const orders = await Order.find({ customerId: req.user.id })
        .populate({
          path: "cartItems",
          populate: { path: "productId" },
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({orders, message: "ok"});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Lỗi server"});
    }
  },
  updateOrderUser: async (req, res) => {
    const { type } = req.body;
    const { orderId } = req.params;
    try {
      const updateStatus = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          status: parseInt(type),
        }
      ); // return object

      const cart = updateStatus.cartItems;
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOneAndUpdate(
          { _id: cart[i].productId },
          {
            $inc: {
              sold: -parseInt(cart[i].quantity),
              stock: parseInt(cart[i].quantity),
            },
          }
        );
      }
      return res.status(200).json({message:"Cập nhật thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Lỗi server"});
    }
  },
  getOrderUser: async (req, res) => {
    try {
      let conditions = {
        $and: [{ customerId: req.user.id }, { _id: req.params.orderId }],
      };
      const order = await Order.find(conditions)
        .populate({
          path: "cartItems",
          populate: { path: "productId" },
        })
        .populate("customerId");
      res.status(200).json({order, message:"ok"});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Lỗi server"});
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const page = req.query._page || 1;
      const limit = req.query._limit || 12;
      const q = req.query.q;

      const totalOrder = await Order.find()
        .populate({
          path: "customerId",
        })
        .sort({ updatedAt: -1 });

      const filterOrders = totalOrder.filter(
        (item) =>
          item.customerId.name.indexOf(q) !== -1 ||
          item.customerId.email.indexOf(q) !== -1
      );
      return res.status(200).json({
        orders: pagination(page, limit, filterOrders),
        pagination: {
          _page: parseInt(page),
          _limit: parseInt(limit),
          _totalRows: filterOrders.length,
        },
        message: "ok"
      },);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "lỗi server"});
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findOne({_id: req.params.orderId})
        .populate({
          path: "cartItems",
          populate: { path: "productId" },
        })
        .populate("customerId");
      if(!order) return res.status(404).json({mesage: "không tìm thấy đơn hàng"})
      res.status(200).json({order, message: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "lỗi server"});
    }
  },
  putOrder: async (req, res) => {
    try {
      const update = req.body;
      const order = await Order.findByIdAndUpdate(req.params.orderId, req.body);
      if (update.status == 0) {
        const cart = order.cartItems;
        for (let i = 0; i < cart.length; i++) {
          const product = await Product.findOneAndUpdate(
            { _id: cart[i].productId },
            {
              $inc: {
                sold: -parseInt(cart[i].quantity),
                stock: parseInt(cart[i].quantity),
              },
            }
          );
        }
      }
      return res.status(200).json({message: "Cập nhật thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
};

module.exports = orderControllers;