const User = require('../models/student.model');

const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      studentId,
      phone,
      gender,
      studentClass,
      batch,
      duration,
      seatNumber,
      address,
      city,
      state,
    } = req.body

    if (
      !fullName ||
      !email ||
      !password ||
      !studentId ||
      !phone ||
      !gender ||
      !studentClass ||
      !batch ||
      !duration ||
      !seatNumber
    ) {
      return res.status(400).json({ message: 'Missing required registration fields' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const existingStudentId = await User.findOne({ studentId })
    if (existingStudentId) {
      return res.status(400).json({ message: 'Student ID already exists' })
    }

    const newUser = new User({
      name: fullName,
      email,
      password,
      studentId,
      phone,
      gender,
      studentClass,
      batch,
      duration,
      seatNumber,
      address,
      city,
      state,
    })

    await newUser.save()
    res.status(201).json({ message: 'Student registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });    
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}    

module.exports = {
    register,
    login,
};