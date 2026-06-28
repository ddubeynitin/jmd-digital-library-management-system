const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/student.model');
const logActivity = require('../utils/activityLogger');

const getAllStudents = async (req, res) => {
    try {
        const students = await User.find();
        res.json({message: 'Students List fetch successfully', data: students});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({message: 'Student fetch successfully', data: student});
    } catch (error){
        res.status(500).json({ message: 'Server error' });
    }
}

const getStudentByStudentId = async (req, res) => {
    try {
        const student = await User.findOne({ studentId: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student fetch successfully', data: student });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const createStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newStudent = new User({ name, email, password });
        await newStudent.save();
        await logActivity({
            actorType: 'admin',
            actorName: 'System Admin',
            activityType: 'student_create',
            title: 'Student created',
            description: `${newStudent.name} was created by admin.`,
            status: 'completed',
            metadata: { studentId: newStudent._id, email: newStudent.email },
        });
        res.status(201).json({ message: 'Student created successfully', data: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { name, email, password, profilePicture } = req.body;
        const updatePayload = { name, email, password };
        if (profilePicture !== undefined) {
            updatePayload.profilePicture = profilePicture;
        }
        const updatedStudent = await User.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }   
        const activityType = profilePicture !== undefined ? 'profile_picture_update' : 'student_update';
        await logActivity({
            actorType: 'student',
            actorName: updatedStudent.name,
            actorId: updatedStudent._id,
            activityType,
            title: profilePicture !== undefined ? 'Profile picture updated' : 'Profile updated',
            description: profilePicture !== undefined
              ? `${updatedStudent.name} changed profile picture.`
              : `${updatedStudent.name} updated profile details.`,
            status: 'completed',
            metadata: {
                email: updatedStudent.email,
                profilePictureUpdated: profilePicture !== undefined,
            },
        });
        res.json({message: 'Student updated successfully', data: updatedStudent});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await User.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({message: 'Student deleted successfully', data: deletedStudent});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByStudentId,
    createStudent,
    updateStudent,
    deleteStudent
};
