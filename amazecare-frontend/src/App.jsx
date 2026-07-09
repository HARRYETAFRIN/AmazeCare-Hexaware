import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Reports from "./pages/Reports";

import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorMedicalRecords from "./pages/DoctorMedicalRecords";
import DoctorProfile from "./pages/DoctorProfile";

import PatientDashboard from "./pages/PatientDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import PatientMedicalRecords from "./pages/PatientMedicalRecords";
import PatientProfile from "./pages/PatientProfile";
import PatientDoctors from "./pages/PatientDoctors";
import BookAppointment from "./pages/BookAppointment";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute role="Admin">
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute role="Admin">
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute role="Admin">
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicalrecords"
          element={
            <ProtectedRoute role="Admin">
              <MedicalRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute role="Admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/medicalrecords"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorMedicalRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute role="Doctor">
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        {/* Patient Routes */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute role="Patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute role="Patient">
              <PatientAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/medicalrecords"
          element={
            <ProtectedRoute role="Patient">
              <PatientMedicalRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute role="Patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute role="Patient">
              <PatientDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/bookappointment"
          element={
            <ProtectedRoute role="Patient">
              <BookAppointment />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;