const router = require("express").Router();
const controller = require("../controllers/AuthController");
const middleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
router.post("/login", controller.login);
router.post("/register", upload.single("avatar"), controller.registerUser);

router.post('/login', controller.login)
router.post('/register', controller.registerUser)

router.get(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.viewProfile
)

//update password
router.put(
  "/update/:user_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
);

//update profile
router.put(
  "/updateProfile/:user_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProfile
);
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
);

module.exports = router;
