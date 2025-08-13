const router = require('express').Router()
const controller = require('../controllers/ListingController')
const middleware = require('../middleware/authMiddleware')

router.get('/tracked/:user_id', controller.getTrackedLists)
router.get('/owned/:user_id', controller.getOwnedLists)

router.post('/tracked/:user_id', controller.addToTrackedList)
router.post('/owned/:user_id', controller.addToOwnedList)

router.put('/owned/:user_id', controller.deleteOwned)
router.put('/tracked/:user_id', controller.deleteTracked)

module.exports = router
