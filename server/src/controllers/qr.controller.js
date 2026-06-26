const QRCode = require('qrcode');

const generateStudentQr = async (req, res) => {
  try {
    const payload = JSON.stringify({
      studentId: req.params.studentId,
      issuedAt: new Date().toISOString(),
    });

    const dataUrl = await QRCode.toDataURL(payload, { margin: 1, width: 260 });
    res.json({ message: 'QR generated successfully', data: { qrCode: dataUrl, payload } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { generateStudentQr };
