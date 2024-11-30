import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Adjust the import path as necessary

const AddMedicalReportForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient's data

  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users"); // Update the URL to match your endpoint
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        alert(
          "Failed to fetch patients: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Handle patient selection
  const handlePatientSelect = (e) => {
    const selectedEmail = e.target.value;
    const patient = patients.find((p) => p.email === selectedEmail);
    setSelectedPatient(patient);

    if (patient) {
      console.log("Selected Patient:", patient); // Debugging line
      setValue("height", patient.height);
      setValue("weight", patient.weight);
    }
  };

  const onSubmit = async (data) => {
    try {
      const reportData = {
        ...data,
        patientName: selectedPatient.name, // Ensure selectedPatient is set correctly
        patientEmail: selectedPatient.email,
        reportDate: new Date().toISOString(),
        followUpDate: new Date(
          new Date().setDate(new Date().getDate() + 7)
        ).toISOString(),
      };

      // Log the reportData to see what's being sent
      console.log("Sending report data:", reportData);

      await axios.post("http://localhost:3000/api/medicalReport", reportData);
      alert("Medical Report added successfully");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Failed to add medical report: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
            Medical Report Form
          </h2>

          {loading ? (
            <div className="text-center">Loading patients...</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient Selection Section */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Select Patient
                </h3>
                <select
                  {...register("patientName", { required: true })}
                  onChange={handlePatientSelect}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.email} value={patient.email}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vital Signs Section */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Vital Signs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Sugar Level (mg/dL)
                    </label>
                    <input
                      type="number"
                      {...register("sugarLevel", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      {...register("heartRate", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Blood Pressure (mmHg)
                    </label>
                    <input
                      type="number"
                      {...register("bloodPressure", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Cholesterol Level (mg/dL)
                    </label>
                    <input
                      type="number"
                      {...register("cholesterolLevel", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      {...register("weight", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      readOnly
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      {...register("height", { required: true })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                      readOnly
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms and Diagnosis Section */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Symptoms & Diagnosis
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Symptoms
                  </label>
                  <textarea
                    {...register("symptoms", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    rows="3"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Diagnosis
                  </label>
                  <textarea
                    {...register("diagnosis", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    rows="3"
                    required
                  />
                </div>
              </div>

              {/* Treatment Section */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-300">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Treatment & Prescription
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Treatment
                  </label>
                  <textarea
                    {...register("treatment", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    rows="3"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600">
                    Prescription
                  </label>
                  <textarea
                    {...register("prescription", { required: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                    rows="3"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="block w-full py-3 px-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Submit Medical Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMedicalReportForm;
