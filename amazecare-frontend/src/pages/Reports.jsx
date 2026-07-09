import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

function Reports() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const doctorRes = await api.get("/Doctor");
      const patientRes = await api.get("/Patient");
      const appointmentRes = await api.get("/Appointment");
      const recordRes = await api.get("/MedicalRecord");

      setDoctors(doctorRes.data);
      setPatients(patientRes.data);
      setAppointments(appointmentRes.data);
      setMedicalRecords(recordRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const completedAppointments = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  const bookedAppointments = appointments.filter(
    (a) => a.status === "Booked"
  ).length;

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container mt-4">
          <h2 className="reports-title">
            📊 Generate Reports
          </h2>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="report-card">
                <h5>👨‍⚕️ Total Doctors</h5>
                <h1>{doctors.length}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="report-card">
                <h5>🧑‍🤝‍🧑 Total Patients</h5>
                <h1>{patients.length}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="report-card">
                <h5>📅 Total Appointments</h5>
                <h1>{appointments.length}</h1>
              </div>
            </div>

            <div className="col-md-3">
              <div className="report-card">
                <h5>📋 Medical Records</h5>
                <h1>{medicalRecords.length}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="report-card completed">
                <h5>✅ Completed</h5>
                <h1>{completedAppointments}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="report-card pending">
                <h5>Cancelled</h5>
                <h1>{pendingAppointments}</h1>
              </div>
            </div>

            <div className="col-md-4">
              <div className="report-card booked">
                <h5>📌 Booked</h5>
                <h1>{bookedAppointments}</h1>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;