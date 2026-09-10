const mongoose = require("mongoose");

const VEHICLE_TYPES = [
  "JCB",
  "Tractor",
  "Lorry",
  "Excavator",
  "Crane",
  "Bulldozer",
  "Loader",
  "Trailer",
];

const vehicleSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: VEHICLE_TYPES, required: true },
    imageKey: { type: String, required: true },
    pricePerHour: { type: Number, required: true, min: 0 },
    availabilityStatus: {
      type: String,
      enum: ["available", "booked", "offline"],
      default: "available",
    },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
module.exports.VEHICLE_TYPES = VEHICLE_TYPES;
