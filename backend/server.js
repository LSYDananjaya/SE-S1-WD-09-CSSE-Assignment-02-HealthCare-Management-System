const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const app = express();
const port = 3000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://yehara:yehara1234@cluster0.33vsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

const userRoutes = require("./routes/userRoutes"); // Import userRoutes
app.use("/api/users", userRoutes); // Use the userRoutes for the /api/users endpoint

const appointmentsRoute = require("./routes/appointmentsRoute"); // Import userRoutes
app.use("/api/appointments", appointmentsRoute); // Use the userRoutes for the /api/users endpoint

const paymentRoutes = require("./routes/paymentRoutes"); // Import userRoutes
app.use("/api/payments", paymentRoutes); // Use the userRoutes for the /api/users endpoint

const doctorRoutes = require("./routes/doctorRoutes"); // Import reportRoutes
app.use("/api/doctors", doctorRoutes); // Use the reportRoutes for the /api/reports endpoint

const MedicalReportRoutes = require("./routes/MedicalReportsRoutes");
app.use("/api/medicalReport", MedicalReportRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
