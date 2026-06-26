const mongoose = require('mongoose');
const Fee = require('../models/fees.model');
const Student = require('../models/student.model');
const logActivity = require('../utils/activityLogger');

// Get all fees
const getAllFees = async (req, res) => {
    try {
        const fees = await Fee.find().populate('student', 'name email studentId');
        res.json({ message: 'Fees list fetched successfully', data: fees });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get fee by ID
const getFeeById = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id).populate('student', 'name email studentId');
        if (!fee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }
        res.json({ message: 'Fee fetched successfully', data: fee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get fees by student ID
const getFeesByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fees = await Fee.find({ student: studentId });
        res.json({ message: 'Student fees fetched successfully', data: fees });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new fee record
const createFee = async (req, res) => {
    try {
        const { student, amount, dueDate, status } = req.body;

        if (!student || !amount || !dueDate) {
            return res.status(400).json({ message: 'Missing required fields: student, amount, dueDate' });
        }

        if (!mongoose.Types.ObjectId.isValid(student)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const studentExists = await Student.findById(student);
        if (!studentExists) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const newFee = new Fee({
            student,
            amount,
            dueDate,
            status: status || 'unpaid'
        });

        await newFee.save();
        await newFee.populate('student', 'name email studentId');
        await logActivity({
            actorType: 'student',
            actorName: studentExists.name,
            actorId: studentExists._id,
            activityType: 'fee_created',
            title: 'Fee record created',
            description: `Fee of ${amount} created for ${studentExists.name}.`,
            status: 'pending',
            metadata: { feeId: newFee._id, amount, dueDate, feeStatus: newFee.status },
        });

        res.status(201).json({ message: 'Fee created successfully', data: newFee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update fee (amount, dueDate, or status)
const updateFee = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, dueDate, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid fee ID' });
        }

        const updateData = {};
        if (amount !== undefined) updateData.amount = amount;
        if (dueDate !== undefined) updateData.dueDate = dueDate;
        if (status !== undefined) {
            if (!['paid', 'unpaid'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status. Must be "paid" or "unpaid"' });
            }
            updateData.status = status;
        }

        const updatedFee = await Fee.findByIdAndUpdate(id, updateData, { new: true }).populate('student', 'name email studentId');
        
        if (!updatedFee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        res.json({ message: 'Fee updated successfully', data: updatedFee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark fee as paid
const payFee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid fee ID' });
        }

        const fee = await Fee.findById(id);
        if (!fee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        if (fee.status === 'paid') {
            return res.status(400).json({ message: 'Fee is already marked as paid' });
        }

        fee.status = 'paid';
        await fee.save();
        await fee.populate('student', 'name email studentId');
        await logActivity({
            actorType: 'student',
            actorName: fee.student?.name || 'Student',
            actorId: fee.student?._id || null,
            activityType: 'fee_paid',
            title: 'Fee paid',
            description: `${fee.student?.name || 'A student'} paid fee of ${fee.amount}.`,
            status: 'completed',
            metadata: { feeId: fee._id, amount: fee.amount },
        });

        res.json({ message: 'Fee marked as paid successfully', data: fee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete fee record
const deleteFee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid fee ID' });
        }

        const deletedFee = await Fee.findByIdAndDelete(id);
        if (!deletedFee) {
            return res.status(404).json({ message: 'Fee record not found' });
        }

        res.json({ message: 'Fee deleted successfully', data: deletedFee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get fees by status (paid/unpaid)
const getFeesByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        if (!['paid', 'unpaid'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be "paid" or "unpaid"' });
        }

        const fees = await Fee.find({ status }).populate('student', 'name email studentId');
        res.json({ message: `${status} fees fetched successfully`, data: fees });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllFees,
    getFeeById,
    getFeesByStudent,
    createFee,
    updateFee,
    payFee,
    deleteFee,
    getFeesByStatus
};
