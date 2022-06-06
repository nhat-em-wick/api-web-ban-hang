const router = require("express").Router();
const productControllers = require("../controllers/productController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");

router.get("/", productControllers.getAllProduct);
router.get("/tracking", productControllers.tracking);
router.get("/:slug", productControllers.getProduct);
router.post(
  "/",
  tokenMiddleware.verifyToken,
  tokenMiddleware.verifyTokenAndAdmin,
  productControllers.postProduct
);
router.put(
  "/:productId",
  tokenMiddleware.verifyToken,
  tokenMiddleware.verifyTokenAndAdmin,
  productControllers.putProduct
);
router.delete(
  "/",
  tokenMiddleware.verifyToken,
  tokenMiddleware.verifyTokenAndAdmin,
  productControllers.deleteProducts
);

module.exports = router;