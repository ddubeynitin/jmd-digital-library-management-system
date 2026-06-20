const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/student.routes");
const adminRoutes = require("./src/routes/admin.routes");
    
app.use("/api/auth", authRoutes);
app.use("/api/students", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});