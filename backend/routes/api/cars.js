const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const carController = require('../../controllers/carController');

// @route    GET api/cars
// @desc     Get all cars (ads)
// @access   Public
router.get('/', carController.getAllCars);

// @route    GET api/cars/user
// @desc     Get cars by user ID
// @access   Private
router.get('/user', auth, carController.getCarsByUserId);

// @route    POST api/cars
// @desc     Create a car (ad)
// @access   Private
router.post(
  '/',
  [
    auth,
    role(['user', 'admin']),
    [
      check('brand', 'Brand is required').not().isEmpty(),
      check('model', 'Model is required').not().isEmpty(),
      check('year', 'Year is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty(),
      check('kilometers', 'Kilometers are required').not().isEmpty(),
      check('fuel', 'Fuel type is required').not().isEmpty(),
      check('consumption', 'Consumption is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('image', 'Image URL is required').not().isEmpty()
    ]
  ],
  carController.createCar
);

// @route    GET api/cars/:id
// @desc     Get a car by ID
// @access   Public
router.get('/:id', carController.getCarById);

// @route    PUT api/cars/:id
// @desc     Update a car (ad)
// @access   Private
router.put('/:id', auth, role(['user', 'admin']), carController.updateCar);

// @route    DELETE api/cars/:id
// @desc     Delete a car (ad)
// @access   Private
router.delete('/:id', auth, role(['user', 'admin']), carController.deleteCar);

module.exports = router;
