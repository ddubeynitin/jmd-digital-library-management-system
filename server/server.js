const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const TimeSlot = require("./src/models/timeSlot.model");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const ensureDefaultSlots = async () => {
  const count = await TimeSlot.countDocuments();
  if (count === 0) {
    await TimeSlot.insertMany([
      { slotName: "Slot A", startTime: "06:00 AM", endTime: "12:00 PM", branchId: "main" },
      { slotName: "Slot B", startTime: "12:00 PM", endTime: "06:00 PM", branchId: "main" },
    ]);
  }
};

// Routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/student.routes");
const adminRoutes = require("./src/routes/admin.routes");
const seatRoutes = require("./src/routes/seat.routes");
const attendanceRoutes = require("./src/routes/attendance.routes");
const feesRoutes = require("./src/routes/fees.routes");
const slotRoutes = require("./src/routes/slot.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const notificationRoutes = require("./src/routes/notification.routes");
const qrRoutes = require("./src/routes/qr.routes");
    
app.use("/api/auth", authRoutes);
app.use("/api/students", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/qr", qrRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await ensureDefaultSlots();
  console.log(`Server running on port ${PORT}`);
});
