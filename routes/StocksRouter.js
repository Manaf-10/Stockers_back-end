const router = require("express").Router();
const controller = require("../controllers/StocksController");
const middleware = require("../middleware/authMiddleware");

router.get(
  "/:symbol",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getStockData
);

router.get("/stock-list", controller.getStockList);
module.exports = router;
