const Product = require('../models/Product')
const pagination = require("../utils/pagination");

const productControllers = {

  tracking: async (req, res) => {
    const {slug, quantity} = req.query
    try {
      const product = await Product.findOne({ slug: slug })
      
      if(product.stock >= parseInt(quantity) ) {
        return res.status(200).json({message: "Thành công"})
      }else {
        return res.status(400).json({message: `Vượt quá số lượng trong kho`})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({messgae:'có lỗi'})
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const page = req.query._page || 1;
      const limit = req.query._limit || 12;
      const { q, cate, price_lte, price_gte, best_seller } = req.query;
      let conditions = { $and: [] };
      
      if (q) {
        conditions.$and.push({ $text: { $search: q } });
      }
      if (cate && cate.length > 0) {
        let categories = [];
        for (let i = 0; i < cate.length; i++) {
          categories.push(cate[i]);
        }
        conditions.$and.push({ category: categories });
      }

      if(best_seller){
        conditions.$and.push({ sold: {$gte: 5} });
      }

      if (price_gte && price_lte) {
        const priceGte = parseInt(price_gte);
        const priceLte = parseInt(price_lte);
        conditions.$and.push({
          $and: [
            { new_price: { $gte: priceGte } },
            { new_price: { $lte: priceLte } },
          ],
        });
      } else if (price_gte) {
        const priceGte = parseInt(price_gte);
        conditions.$and.push({ new_price: { $gte: priceGte } });
      } else if (price_lte) {
        const priceLte = parseInt(price_lte);
        conditions.$and.push({ new_price: { $lte: priceLte } });
      }

      let response;
      if (conditions.$and.length > 0) {
        const totalProduct = await Product.find(conditions)
          .populate("category")
          .sort({ createdAt: -1 });
        response = totalProduct;
      } else {
        const totalProduct = await Product.find()
          .populate("category")
          .sort({ createdAt: -1 });
        response = totalProduct;
      }

      return res.status(200).json({
        products: pagination(page, limit, response),
        pagination: {
          _page: parseInt(page),
          _limit: parseInt(limit),
          _totalRows: response.length,
        },
        message: "ok"
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "lỗi server"});
    }
  },
  getProduct: async (req, res) => {
    try {
      const slug = req.params.slug;
      const product = await Product.findOne({ slug: slug }).populate(
        "category"
      );
      if(!product) {
        return res.status(404).json({message: "Không tìm thấy sản phẩm"})
      }
      return res.status(200).json({product, message: "ok"});
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "có lỗi xảy ra"});
    }
  },

  postProduct: async (req, res) => {
    try {
      const newProduct = await Product.create({
        name: req.body.name,
        stock: req.body.quantity,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        category: req.body.category || "629a06c28455b0905bb1a43c",
        gallery: req.body.gallery,
      });
      return res.status(200).json({message: "Thêm sản phẩm thành công"});
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "lỗi server"});
    }
  },
  putProduct: async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.productId },
        {
          name: req.body.name,
          stock: req.body.quantity,
          old_price: req.body.old_price,
          new_price: req.body.new_price,
          category: req.body.category || "629a06c28455b0905bb1a43c",
          long_description: req.body.long_description,
          short_description: req.body.short_description,
          gallery: req.body.gallery,
        }
      );

      return res.status(200).json({ message: "Cập nhật thành công", product });
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "lỗi server"});
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const deleted = await Product.deleteMany({ _id: { $in: req.query.ids } });
      return res.status(200).json({message:"Xóa thành công"});
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "lỗi server"});
    }
  },
};

module.exports = productControllers;