const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, password, email, phoneNumber, country, state, street, streetNumber, profilePicture, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Validate role
    const validRoles = ['guest', 'user', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid role' }] });
    }

    user = new User({
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      address: {
        country,
        state,
        street,
        streetNumber
      },
      profilePicture,
      role: role || 'user'  // Default to 'user' if no role is provided
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Authenticate user and get token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, username, email, phoneNumber, address, profilePicture } = req.body;
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      console.log(`User not found: ${req.user.id}`);
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Allow the user to update their own profile only
    if (req.user.role === 'user' && req.user.id !== user.id.toString()) {
      console.log(`Access denied: User ${req.user.id} trying to update profile of ${user.id}`);
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    if (address) {
      user.address.country = address.country || user.address.country;
      user.address.state = address.state || user.address.state;
      user.address.street = address.street || user.address.street;
      user.address.streetNumber = address.streetNumber || user.address.streetNumber;
    }

    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();
    console.log(`User profile updated: ${user.id}`);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a user (admin)
exports.updateUser = async (req, res) => {
  const { firstName, lastName, username, email, phone, address, profilePicture, role, status } = req.body;

  try {
    let user = await User.findOne({ userID: req.params.id });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phone || user.phoneNumber;

    if (address) {
      user.address.country = address.country || user.address.country;
      user.address.state = address.state || user.address.state;
      user.address.street = address.street || user.address.street;
      user.address.streetNumber = address.streetNumber || user.address.streetNumber;
    }

    user.profilePicture = profilePicture || user.profilePicture;
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userID: req.params.id });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};