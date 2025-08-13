const router = require('express').Router()
const controller = require('../controllers/PostController')
const middleware = require('../middleware/authMiddleware')
const upload = require('../middleware/posts-upload')
router.get('/', controller.ReadPost)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('img'),
  controller.CreatePost
)
router.put(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePost
)
router.delete(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)

router.get(
  '/user/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetPostsByUser
)

router.get(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetPostsToEdit
)

module.exports = router
