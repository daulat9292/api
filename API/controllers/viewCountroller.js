const COURSE = require("../models/courseModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === "booking")
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get course data from collection
  const user = req.userData;
  const courses = await COURSE.find();

  // 2) Build template
  // 3) Render that template using course data from 1)
  res.status(200).json({
    title: "All Courses",
    user,
    courses,
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested course (including reviews and guides)
  const course = await COURSE.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!course) {
    return next(new AppError("There is no course with that name.", 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).json({
    title: `${course.name} Course`,
    course,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).json({
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  const user = req.user;
  res.status(200).json({
    title: "Your account",
    user,
  });
};

exports.getMyCourses = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find course with the returned IDs
  const courseIDs = bookings.map((el) => el.course);
  const courses = await COURSE.find({ _id: { $in: courseIDs } });

  res.status(200).json({
    title: "My Courses",
    courses,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    title: "Your account",
    user: updatedUser,
  });
});

exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
