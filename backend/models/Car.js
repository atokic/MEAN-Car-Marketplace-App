const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CarSchema = new mongoose.Schema({
  carID: {
    type: String,
    default: uuidv4,
    unique: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  kilometers: {
    type: Number,
    required: true
  },
  fuel: {
    type: String,
    required: true,
    trim: true
  },
  consumption: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Car = mongoose.model('car', CarSchema);
