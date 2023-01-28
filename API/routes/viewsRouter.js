const express = require("express");
const viewsController = require("../controllers/viewCountroller");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(viewsController.alerts);

router.get("/overView", authController.isLoggedIn, viewsController.getOverview);

router.get(
  "/course/lession/:slug",
  authController.isLoggedIn,
  viewsController.getCourse
);
router.get(
  "/userlogin",
  authController.isLoggedIn,
  viewsController.getLoginForm
);
router.get("/userlogout", authController.isLoggedIn, authController.logout);
router.get("/me", authController.protect, viewsController.getAccount);
router.get(
  "/delete-my-account",
  authController.protect,
  viewsController.deleteMyAccount
);
router.get("/my-courses", authController.protect, viewsController.getMyCourses);

router.post(
  "/update-user-data",
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
