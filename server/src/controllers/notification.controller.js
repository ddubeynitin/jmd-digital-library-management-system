const Notification = require('../models/notification.model');

const getNotificationsByStudent = async (req, res) => {
  try {
    const notifications = await Notification.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
    res.json({ message: 'Notifications fetched successfully', data: notifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getNotificationsByStudent };
