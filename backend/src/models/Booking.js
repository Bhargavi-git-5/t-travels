const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    durationHours: { type: Number, required: true, min: 1 },
    pricePerHourAtBooking: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    startTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
