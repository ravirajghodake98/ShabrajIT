const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A course must have a name.'],
    unique: true,
    trim: true,
    minlength: [2, 'A course name must have more than or equal to 5 characters.'],
    maxlength: [40, 'A course name must have less than or equal to 40 characters.']
  },
  description: {
    type: String
  },
  duration: {
    type: Number,
    required: [true, 'A course must have a duration.']
  },
  price: {
    type: Number,
    required: [true, 'A course must have a price.']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below the real price.'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    required: true,
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Difficulty is either: beginner, intermediate or advanced'
    }
  },
  imageCover: {
    type: String
  },
  images: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: {
    type: [Date]
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;