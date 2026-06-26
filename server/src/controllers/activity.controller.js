const Activity = require('../models/activity.model');

const getRecentActivities = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);

    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      message: 'Recent activities fetched successfully',
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getRecentActivities,
};
