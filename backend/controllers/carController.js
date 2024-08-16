const Car = require('../models/Car');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get cars by user ID
exports.getCarsByUserId = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a car
exports.createCar = async (req, res) => {
  const { brand, model, year, price, kilometers, fuel, consumption, description, image } = req.body;

  try {
    const newCar = new Car({
      brand,
      model,
      year,
      price,
      kilometers,
      fuel,
      consumption,
      description,
      image,
      user: req.user.id
    });

    const car = await newCar.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ carID: req.params.id });

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  const { brand, model, year, price, kilometers, fuel, consumption, description, image } = req.body;

  try {
    const car = await Car.findOneAndUpdate(
      { carID: req.params.id, user: req.user.id },
      { $set: { brand, model, year, price, kilometers, fuel, consumption, description, image } },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ carID: req.params.id, user: req.user.id });

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    res.json({ msg: 'Car removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};