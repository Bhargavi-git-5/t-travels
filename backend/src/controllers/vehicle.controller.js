const Vehicle = require("../models/Vehicle");
const { asyncHandler } = require("../middleware/error.middleware");

// GET /api/vehicles?type=JCB&status=available&search=crane
const getVehicles = asyncHandler(async (req, res) => {
  const { type, status, search } = req.query;
  const filter = {};

  if (type) filter.type = type;
  if (status) filter.availabilityStatus = status;
  if (search) filter.name = { $regex: search, $options: "i" };

  const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
  res.json(vehicles);
});

// GET /api/vehicles/:id
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }
  res.json(vehicle);
});

// POST /api/vehicles  (driver only)
const createVehicle = asyncHandler(async (req, res) => {
  const { name, type, imageKey, pricePerHour, driverName, driverPhone, description, location } =
    req.body;

  const vehicle = await Vehicle.create({
    owner: req.user._id,
    name,
    type,
    imageKey,
    pricePerHour,
    driverName,
    driverPhone,
    description,
    location,
  });

  res.status(201).json(vehicle);
});

// PATCH /api/vehicles/:id (driver only, must own the vehicle)
const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }

  if (vehicle.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only edit vehicles you own");
  }

  const editableFields = [
    "name",
    "type",
    "imageKey",
    "pricePerHour",
    "availabilityStatus",
    "driverName",
    "driverPhone",
    "description",
    "location",
  ];
  editableFields.forEach((field) => {
    if (req.body[field] !== undefined) vehicle[field] = req.body[field];
  });

  await vehicle.save();
  res.json(vehicle);
});

// GET /api/vehicles/driver/mine (driver only - vehicles owned by the logged-in driver)
const getMyVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(vehicles);
});

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, getMyVehicles };
