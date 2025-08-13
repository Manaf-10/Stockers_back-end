const router = require('express').Router()
const controller = require('../controllers/ListingController')
const middleware = require('../middleware/authMiddleware')

router.get(
  '/tracked/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getTrackedLists
)
router.get(
  '/owned/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getOwnedLists
)

router.post(
  '/tracked/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToTrackedList
)
router.post(
  '/owned/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addToOwnedList
)

router.put(
  '/owned/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteOwned
)
router.put(
  '/tracked/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteTracked
)

module.exports = router
