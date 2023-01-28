const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:courseId/reviews", reviewRouter);

router
  .route("/top-5-course")
  .get(courseController.aliasTopCourse, courseController.getAllCourses);

router.route("/course-stats").get(courseController.getCourseStats);
router.route("/monthly-plan/:year").get(
  authController.protect,
  // authController.restrictTo("admin", "lead-guide", "guide"),
  authController.restrictTo("admin"),
  courseController.getMonthlyPlan
);

// router
//   .route("/distances/:latlng/unit/:unit")
//   .get(courseController.getDistances);

router.route("/").get(courseController.getAllCourses).post(
  // authController.protect,
  // authController.restrictTo("admin", "lead-guide"),
  // authController.restrictTo("admin"),
  courseController.createCourse
);

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(
    authController.protect,
    // authController.restrictTo("admin"),
    courseController.uploadCourseImages,
    courseController.resizeCourseImages,
    courseController.updateCourse
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    authController.restrictTo("admin"),
    courseController.deleteCourse
  );

module.exports = router;
