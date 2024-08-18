const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const userController = require('../../controllers/userController');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    //check('state', 'State is required').not().isEmpty(),
    check('street', 'Street is required').not().isEmpty(),
    check('streetNumber', 'Street number is required').not().isEmpty()
  ],
  userController.registerUser
);

// @route    GET api/users/profile
// @desc     Get user profile
// @access   Private
router.get('/profile', auth, userController.getUserProfile);

// @route    PUT api/users/profile
// @desc     Update user profile
// @access   Private
router.put('/profile', auth, role(['user', 'admin']), userController.updateUserProfile);

// @route    GET api/users
// @desc     Get all users (admin)
// @access   Private (Admin)
router.get('/', [auth, role(['admin'])], userController.getAllUsers);

// @route    DELETE api/users/:id
// @desc     Delete a user (admin)
// @access   Private (Admin)
router.delete('/:id', [auth, role(['admin'])], userController.deleteUser);

// @route    PUT api/users/:id
// @desc     Update a user (admin)
// @access   Private (Admin)
router.put('/:id', [auth, role(['admin'])], userController.updateUser);

module.exports = router;
