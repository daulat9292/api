const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require('./userModel');
// const validator = require('validator');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A course must have a name"],
      trim: true,
      maxlength: [
        40,
        "A course name must have less or equal then 40 characters",
      ],
      minlength: [
        10,
        "A course name must have more or equal then 10 characters",
      ],
    },
    title: {
      type: String,
      required: [true, "A course must have a name"],
      trim: true,
      maxlength: [
        160,
        "A course name must have less or equal then 160 characters",
      ],
      minlength: [
        20,
        "A course name must have more or equal then 20 characters",
      ],
      // validate: [validator.isAlpha, 'Course name must only contain characters']
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A course must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "A course must have a duration"],
    },
    category: {
      type: String,
      required: [true, "A course must have a category"],
      enum: {
        values: ["Blockchain", "Web Development", "Playlist"],
        message: "Difficulty is either: Blockchain, Web Development, Playlist",
      },
    },
    difficulty: {
      type: String,
      required: [true, "A course must have a difficulty"],
      enum: {
        values: ["Easy", "Medium", "Advance"],
        message: "Difficulty is either: Easy, Medium, Advance",
      },
    },
    starterFile: String,
    finalFile: String,
    slug: String,
    videoId: String,
    creator: [
      {
        name: String,
        GitHub: String,
        YouTube: String,
        profession: String,
        description: String,
      },
    ],
    links: [
      {
        name: String,
        link: String,
      },
    ],
    chapter: [
      {
        chapter: String,
        topic: String,
        percentage: String,
        section: [
          {
            title: String,
            duration: String,
            link: String,
            videoId: String,
            free: Boolean,
            new: Boolean,
            complete: String,
            timeStamp: String,
          },
        ],
      },
    ],
    maxGroupSize: {
      type: Number,
      required: [true, "A course must have a group size"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A course must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },

    imageCover: {
      type: String,
      required: [true, "A course must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretCourse: {
      type: Boolean,
      default: false,
    },

    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// courseSchema.index({ price: 1 });
courseSchema.index({ price: 1, ratingsAverage: -1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ startLocation: "2dsphere" });

courseSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Virtual populate
courseSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "course",
  localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.find({ secretCourse: { $ne: true } });

  this.start = Date.now();
  next();
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });

  next();
});

const COURSE = mongoose.model("COURSE", courseSchema);

module.exports = COURSE;
