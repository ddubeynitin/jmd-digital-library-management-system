const Seat = require('../models/seat.model');
const Student = require('../models/student.model');
const logActivity = require('../utils/activityLogger');

const getSeatsByBatchAndShift = async (req, res) => {
  try {
    const { branchId = 'main' } = req.query;
    const seats = await Seat.find({ branchId }).sort({ seatNumber: 1 }).populate('reservedBy', 'name email studentId').populate('bookingId');
    res.json({ message: 'Seats loaded successfully', data: seats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPendingSeatRequests = async (req, res) => {
  try {
    const seats = await Seat.find({ status: 'reserved' }).populate('reservedBy', 'name email studentId').populate('bookingId');
    res.json({ message: 'Pending seat requests loaded', data: seats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const approveSeatRequest = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat request not found' });
    }
    if (seat.status === 'inactive') {
      return res.status(400).json({ message: 'Inactive seats cannot be approved' });
    }

    const student = await Student.findById(seat.reservedBy);
    if (!student) {
      return res.status(404).json({ message: 'Requesting student not found' });
    }

    seat.status = 'reserved';
    seat.reservedBy = student._id;
    seat.reservedAt = new Date();
    await seat.save();

    student.seatAllocationStatus = 'confirmed';
    student.seatAllocationConfirmedAt = new Date();
    await student.save();

    await logActivity({
      actorType: 'admin',
      actorName: 'System Admin',
      activityType: 'seat_approved',
      title: 'Seat request approved',
      description: `Seat ${seat.seatNumber} was approved for ${student.name}.`,
      status: 'completed',
      metadata: {
        seatId: seat._id,
        studentId: student._id,
        seatNumber: seat.seatNumber,
        batch: seat.batch,
        shift: seat.shift,
      },
    });

    res.json({ message: 'Seat request approved successfully', data: seat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const rejectSeatRequest = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat request not found' });
    }
    if (seat.status === 'inactive') {
      return res.status(400).json({ message: 'Inactive seats cannot be rejected' });
    }

    const student = await Student.findById(seat.reservedBy);
    if (student) {
      student.seatAllocationStatus = 'rejected';
      await student.save();
    }

    seat.status = 'available';
    seat.reservedBy = null;
    seat.reservedAt = null;
    seat.bookingId = null;
    seat.slotIds = [];
    await seat.save();

    await logActivity({
      actorType: 'admin',
      actorName: 'System Admin',
      activityType: 'seat_rejected',
      title: 'Seat request rejected',
      description: `Seat ${seat.seatNumber} request was rejected.`,
      status: 'warning',
      metadata: {
        seatId: seat._id,
        studentId: student?._id || null,
        seatNumber: seat.seatNumber,
      },
    });

    res.json({ message: 'Seat request rejected successfully', data: seat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createSeat = async (req, res) => {
  try {
    const { branchId = 'main', seatNumber } = req.body;
    if (!seatNumber) {
      return res.status(400).json({ message: 'seatNumber is required' });
    }
    const existing = await Seat.findOne({ branchId, seatNumber });
    if (existing) {
      return res.status(400).json({ message: 'Seat already exists' });
    }
    const seat = new Seat({ branchId, seatNumber });
    await seat.save();
    await logActivity({
      actorType: 'admin',
      actorName: 'System Admin',
      activityType: 'seat_created',
      title: 'Seat added',
      description: `Seat ${seatNumber} was created for branch ${branchId}.`,
      status: 'completed',
      metadata: { seatId: seat._id, branchId, seatNumber },
    });
    res.status(201).json({ message: 'Seat created', data: seat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    // Prevent deleting reserved/requested seats unless forced
    if (seat.status === 'reserved' || seat.status === 'requested') {
      return res.status(400).json({ message: 'Cannot delete a reserved seat' });
    }
    await seat.remove();
    await logActivity({
      actorType: 'admin',
      actorName: 'System Admin',
      activityType: 'seat_deleted',
      title: 'Seat deleted',
      description: `Seat ${seat.seatNumber} was deleted.`,
      status: 'warning',
      metadata: { seatId: seat._id, batch: seat.batch, shift: seat.shift, seatNumber: seat.seatNumber },
    });
    res.json({ message: 'Seat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSeatsByBatchAndShift,
  getPendingSeatRequests,
  approveSeatRequest,
  rejectSeatRequest,
  createSeat,
  deleteSeat,
};
