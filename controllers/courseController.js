const Course = require('../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { mongoose } = require('mongoose');

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
});

exports.getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.find({ active: true }).lean();
  if (!courses) {
    throw new AppError("No courses found.", 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'Data fetched successfully.',
    totalCount: courses.length,
    courses
  })
});

exports.getCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new AppError('Please provide valid course id.', 404)
  }

  const course = await Course.findById(courseId).lean();
  if (!course) {
    throw new AppError('No course found', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Course fetched successfully.',
    course
  })
});

exports.updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new AppError('Please provide valid course id.', 404)
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runvalidators: true
  });
  if (!updatedCourse) {
    throw new AppError('No course found with that ID.', 404);
  }

  return res.status(200).json({
    status: 'success',
    message: 'Course updated successfully.',
    updatedCourse
  })
});

exports.removeCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new AppError('Please provide valid course id.', 404);
  }

  const removedCourse = await Course.findOneAndUpdate(
    { _id: courseId, active: true },
    { $set: { active: false } }
  )
  if (!removedCourse) {
    throw new AppError('Course not found', 404)
  }

  return res.status(204).json({
    status: 'success',
    message: 'Course removed successfully.'
  })
})