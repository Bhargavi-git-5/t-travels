const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const Notification = require("../models/Notification");
const { asyncHandler } = require("../middleware/error.middleware");

// POST /api/bookings  (customer only)
//
// IMPORTANT: we never trust a "totalPrice" sent from the frontend.
// The frontend calculates a price for instant UI feedback, but the
// number that actually gets billed/stored is always recalculated here
// from the vehicle's current price in the database. This stops a
// tampered request from booking a vehicle for less than it costs.
const createBooking = asyncHandler(async (req, res) => {
  const { vehicleId, durationHours, startTime } = req.body;

  if (!vehicleId || !durationHours || !startTime) {
    res.status(400);
    throw new Error("vehicleId, durationHours and startTime are all required");
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(404);
    throw new Error("Vehicle not found");
  }

  if (vehicle.availabilityStatus !== "available") {
    res.status(400);
    throw new Error("This vehicle is not currently available for booking");
  }

  const totalPrice = vehicle.pricePerHour * Number(durationHours);

  const booking = await Booking.create({
    vehicle: vehicle._id,
    customer: req.user._id,
    durationHours,
    pricePerHourAtBooking: vehicle.pricePerHour,
    totalPrice,
    startTime,
    status: "pending",
  });

  // Notify the driver who owns this vehicle
  await Notification.create({
    recipient: vehicle.owner,
    message: `New Booking: Your ${vehicle.name} has been booked by ${req.user.name}.`,
    type: "new_booking",
    relatedBooking: booking._id,
  });

  res.status(201).json(booking);
});

// GET /api/bookings/my  (customer's own bookings)
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate("vehicle", "name type imageKey pricePerHour")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

// GET /api/bookings/driver  (bookings for vehicles the driver owns)
const getDriverBookings = asyncHandler(async (req, res) => {
  const myVehicles = await require("../models/Vehicle").find({ owner: req.user._id }).select("_id");
  const vehicleIds = myVehicles.map((v) => v._id);

  const bookings = await Booking.find({ vehicle: { $in: vehicleIds } })
    .populate("vehicle", "name type imageKey pricePerHour")
    .populate("customer", "name phone")
    .sort({ createdAt: -1 });

  res.json(bookings);
});

// GET /api/bookings/:id
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("vehicle")
    .populate("customer", "name phone email");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  // Only the customer who made the booking, or the driver who owns the
  // vehicle, is allowed to view it - otherwise any logged-in user could
  // view any booking just by guessing/enumerating IDs.
  const isCustomer = booking.customer._id.toString() === req.user._id.toString();
  const isOwner = booking.vehicle.owner.toString() === req.user._id.toString();
  if (!isCustomer && !isOwner) {
    res.status(403);
    throw new Error("You don't have permission to view this booking");
  }

  res.json(booking);
});

// PATCH /api/bookings/:id/status  (driver accepts/rejects, either side can cancel/complete)
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["confirmed", "rejected", "cancelled", "completed"];

  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`status must be one of: ${allowed.join(", ")}`);
  }

  const booking = await Booking.findById(req.params.id).populate("vehicle");
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const isCustomer = booking.customer.toString() === req.user._id.toString();
  const isOwner = booking.vehicle.owner.toString() === req.user._id.toString();

  // Drivers accept/reject/complete; customers can only cancel their own
  // pending booking. This stops a customer confirming their own booking,
  // or a stranger cancelling someone else's.
  const driverActions = ["confirmed", "rejected", "completed"];
  if (driverActions.includes(status) && !isOwner) {
    res.status(403);
    throw new Error("Only the vehicle's driver can do that");
  }
  if (status === "cancelled" && !isCustomer && !isOwner) {
    res.status(403);
    throw new Error("You don't have permission to cancel this booking");
  }

  booking.status = status;
  await booking.save();

  // Keep the vehicle's availability status in sync with the booking outcome
  const vehicle = booking.vehicle;
  if (status === "confirmed") {
    vehicle.availabilityStatus = "booked";
    await vehicle.save();
    await Notification.create({
      recipient: booking.customer,
      message: `Your booking for ${vehicle.name} has been confirmed.`,
      type: "booking_confirmed",
      relatedBooking: booking._id,
    });
  } else if (status === "rejected" || status === "cancelled") {
    await Notification.create({
      recipient: booking.customer,
      message: `Your booking for ${vehicle.name} was ${status}.`,
      type: status === "rejected" ? "booking_rejected" : "booking_cancelled",
      relatedBooking: booking._id,
    });
  } else if (status === "completed") {
    vehicle.availabilityStatus = "available";
    await vehicle.save();
  }

  res.json(booking);
});

module.exports = {
  createBooking,
  getMyBookings,
  getDriverBookings,
  getBookingById,
  updateBookingStatus,
};
