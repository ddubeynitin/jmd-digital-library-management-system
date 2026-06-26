const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null,
    },
    date: {
        type: Date,
        required: true,
    },
    checkIn: {
        type: Date,
        default: null,
    },
    checkOut: {
        type: Date,
        default: null,
    },
    studyDuration: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        default: "present",
    },
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
