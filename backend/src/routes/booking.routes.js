const express = require("express");
const {
  createBooking,
  getMyBookings,
  getDriverBookings,
  getBookingById,
  updateBookingStatus,
} = require("../controllers/booking.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, requireRole("customer"), createBooking);
router.get("/my", protect, requireRole("customer"), getMyBookings);
router.get("/driver", protect, requireRole("driver"), getDriverBookings);
router.get("/:id", protect, getBookingById);
router.patch("/:id/status", protect, updateBookingStatus);

module.exports = router;
