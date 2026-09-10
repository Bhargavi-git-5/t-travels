const express = require("express");
const { getMyNotifications, markAsRead } = require("../controllers/notification.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getMyNotifications);
router.patch("/:id/read", protect, markAsRead);

module.exports = router;
