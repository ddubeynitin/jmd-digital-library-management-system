const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const Student = require('../models/student.model');
const Notification = require('../models/notification.model');
const logActivity = require('../utils/activityLogger');

const getAdminInfo = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDatabaseStats = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        if (!db) {
            return res.status(500).json({ message: 'Database not connected' });
        }

        const collections = await db.listCollections().toArray();
        const stats = await Promise.all(
            collections.map(async (collection) => {
                const collStats = await db.command({ collStats: collection.name });
                return {
                    name: collection.name,
                    count: collStats.count || 0,
                    size: collStats.size || 0,
                };
            })
        );

        const totalSize = stats.reduce((sum, stat) => sum + stat.size, 0);
        const totalCount = stats.reduce((sum, stat) => sum + stat.count, 0);

        res.json({
            message: 'Database stats fetched successfully',
            data: {
                collections: stats,
                totalSize,
                totalCount,
                totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = new Admin({ name, email, password });
        await admin.save();
        await logActivity({
            actorType: 'admin',
            actorName: name,
            actorId: admin._id,
            activityType: 'admin_created',
            title: 'Admin account created',
            description: `Admin account for ${name} was created.`,
            status: 'completed',
            metadata: { email },
        });
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const broadcastMessage = async (req, res) => {
    try {
        const { title, message, type = 'general' } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: 'Title and message are required' });
        }

        const students = await Student.find({}, '_id name studentId');
        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        const notifications = students.map((student) => ({
            studentId: student._id,
            title,
            message,
            type,
            metadata: { broadcast: true },
        }));

        await Notification.insertMany(notifications);

        await logActivity({
            actorType: 'admin',
            actorName: 'System Admin',
            activityType: 'broadcast_message',
            title: 'Broadcast sent',
            description: `${title} was broadcast to ${students.length} students.`,
            status: 'completed',
            metadata: { audience: students.length, type },
        });

        const io = req.app.get('io');
        io?.emit('broadcast-message', { title, message, type, audience: students.length });

        res.status(201).json({
            message: 'Broadcast sent successfully',
            data: { audience: students.length },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminInfo,
    createAdmin,
    broadcastMessage,
    getDatabaseStats
};
