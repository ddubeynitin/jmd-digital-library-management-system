const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/student.model');

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

const createStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newStudent = new User({ name, email, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', data: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedStudent = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }   
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
    createStudent,
    updateStudent,
    deleteStudent
};