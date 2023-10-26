const Course = require('../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCourse = catchAsync(async (req, res) => {
  const newCourse = await Course.create(req.body);

  if (!newCourse) {
    throw new AppError("No course created", 401);
  }

  res.status(201).json({
    status: 'success',
    message: 'Course created successfully.',
    newCourse
  })
})