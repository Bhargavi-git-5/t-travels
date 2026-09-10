const Notification = require("../models/Notification");
const { asyncHandler } = require("../middleware/error.middleware");

// GET /api/notifications  (for the logged-in user)
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(notifications);
});

// PATCH /api/notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  if (notification.recipient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("This notification does not belong to you");
  }
  notification.isRead = true;
  await notification.save();
  res.json(notification);
});

module.exports = { getMyNotifications, markAsRead };
