const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
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

module.exports = {
    getAdminInfo,
    createAdmin
};
