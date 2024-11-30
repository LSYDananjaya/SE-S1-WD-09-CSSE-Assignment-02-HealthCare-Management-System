const mongoose = require("mongoose");

// Define the MedicalReport schema with patientName and patientEmail
const medicalReportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  reportDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  sugarLevel: {
    type: Number, // Sugar level in mg/dL
    required: true,
  },
  bloodPressure: {
    type: Number, // Blood pressure
    required: true,
  },
  heartRate: {
    type: Number, // Heart rate in beats per minute
    required: true,
  },
  cholesterolLevel: {
    type: Number, // Cholesterol level in mg/dL
    required: true,
  },
  weight: {
    type: Number, // Weight in kg
    required: true,
  },
  height: {
    type: Number, // Height in cm
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  followUpDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
});

// Create the MedicalReport model
const MedicalReport = mongoose.model("MedicalReport", medicalReportSchema);

module.exports = MedicalReport;
