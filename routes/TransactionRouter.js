const router = require('express').Router()
const controller = require('../controllers/TransactionController')
const middleware = require('../middleware/authMiddleware')

router.get('/', controller.showTransation)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateTransaction
)
router.put(
  '/:post_id',
  controller.CloseTransaction,
  middleware.verifyToken,
  controller.CreateTransaction
)

module.exports = router
