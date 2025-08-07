const router = require('express').Router()
const controller = require('../controllers/PostController')
const middleware = require('../middleware/authMiddleware')

router.get('/', controller.ReadPost)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePost
)
router.put(
  '/:post_id',
  controller.UpdatePost,
  middleware.verifyToken,
  controller.CreatePost
)
router.delete(
  '/:post_id',
  controller.DeletePost,
  middleware.verifyToken,
  controller.CreatePost
)

module.exports = router
