const router = require('express').Router()
const controller = require('../controllers/TransactionController')
const middleware = require('../middleware/authMiddleware')


// to show all

router.get(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.showTransaction
)
router.post(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateTransaction
)
router.put(
  '/:transaction_id',

  middleware.stripToken,
  middleware.verifyToken,
  controller.CloseTransaction,
)

module.exports = router
