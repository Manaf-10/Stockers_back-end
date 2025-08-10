const router = require('express').Router()
const controller = require('../controllers/TransactionController')
const middleware = require('../middleware/authMiddleware')


// to show all
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.showTransation
)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateTransaction
)
router.put(
  '/:transaction_id',
  controller.CloseTransaction,
  middleware.verifyToken,
  controller.CreateTransaction
)

module.exports = router
