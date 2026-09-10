const express = require("express");
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  getMyVehicles,
} = require("../controllers/vehicle.controller");
const { protect, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Public - anyone browsing the site can see vehicles
router.get("/", getVehicles);

// Specific route registered BEFORE the /:id route, otherwise Express
// would try to treat "driver" as an :id value
router.get("/driver/mine", protect, requireRole("driver"), getMyVehicles);

router.get("/:id", getVehicleById);

router.post("/", protect, requireRole("driver"), createVehicle);
router.patch("/:id", protect, requireRole("driver"), updateVehicle);

module.exports = router;
