const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware/authMiddleware')

router.post('/login', controller.login)
router.post('/register', controller.registerUser)
//update password
router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
