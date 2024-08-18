const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  streetNumber: {
    type: String,
    required: true,
    trim: true
  }
});

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: uuidv4,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: AddressSchema,
    required: true
  },
  role: {
    type: String,
    enum: ['guest', 'user', 'admin'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  profilePicture: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Middleware to hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
  const payload = {
    user: {
      id: this.id,
      role: this.role
    }
  };

  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '5 days' });
};

// Method to validate password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);
