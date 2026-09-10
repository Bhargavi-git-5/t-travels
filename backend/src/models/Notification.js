const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // The user who should SEE this notification (usually the driver)
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["new_booking", "booking_confirmed", "booking_rejected", "booking_cancelled"],
      required: true,
    },
    relatedBooking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
