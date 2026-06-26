const Activity = require('../models/activity.model');

const logActivity = async ({
  actorType,
  actorName,
  actorId = null,
  activityType,
  title,
  description,
  status = 'completed',
  metadata = {},
}) => {
  try {
    await Activity.create({
      actorType,
      actorName,
      actorId,
      activityType,
      title,
      description,
      status,
      metadata,
    });
  } catch (error) {
    console.error('Activity logging failed:', error.message);
  }
};

module.exports = logActivity;
