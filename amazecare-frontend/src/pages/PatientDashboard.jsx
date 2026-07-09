import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

function PatientDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const patientId = payload.PatientId;

      try {
        const appointmentRes = await api.get(
          `/Appointment/patient/${patientId}`
        );

       const appointmentData = appointmentRes.data;

setAppointments(appointmentData);

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcoming = appointmentData.filter(
  (a) =>
    a.status === "Booked" &&
    new Date(a.appointmentDate) >= today
);

setUpcomingCount(upcoming.length);
      } catch {
        setAppointments([]);
      }

      try {
        const medicalRes = await api.get(
          `/MedicalRecord/patient/${patientId}`
        );

        setMedicalRecords(medicalRes.data);
      } catch {
        setMedicalRecords([]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PatientNavbar />

      <div className="d-flex">

        <PatientSidebar />

        <div className="container-fluid p-4">

          <div className="patient-header">

            <h2 className="mb-1">
              Welcome Back
            </h2>

            <p className="text-muted">
              Manage your appointments and medical records.
            </p>

          </div>

          <div className="row mt-4">

  <div
    className="col-md-6"
    onClick={() => navigate("/patient/appointments")}
    style={{ cursor: "pointer" }}
  >
    <div className="dashboard-card">

      <i
        className="bi bi-calendar-check"
        style={{
          fontSize: "42px",
          color: "#222",
          marginBottom: "15px",
        }}
      ></i>

      <h4>Appointments</h4>

      <h2 className="text-primary">
        {appointments.length}
      </h2>

    </div>
  </div>

  <div
    className="col-md-6"
    onClick={() => navigate("/patient/medicalrecords")}
    style={{ cursor: "pointer" }}
  >
    <div className="dashboard-card">

      <i
        className="bi bi-file-medical"
        style={{
          fontSize: "42px",
          color: "#222",
          marginBottom: "15px",
        }}
      ></i>

      <h4>Medical Records</h4>

      <h2 className="text-primary">
        {medicalRecords.length}
      </h2>

    </div>
  </div>
<div
  className="col-md-6 mb-4"
  onClick={() =>
    navigate("/patient/appointments", {
      state: { upcoming: true },
    })
  }
  style={{ cursor: "pointer" }}
>
  <div className="dashboard-card">

    <i
      className="bi bi-calendar-event"
      style={{
        fontSize: "40px",
        color: "#222",
        marginBottom: "15px",
      }}
    ></i>

    <h5
      className="mb-2"
      style={{
        fontWeight: "600",
      }}
    >
      Upcoming
    </h5>

    <h2 className="text-primary">
      {upcomingCount}
    </h2>

  </div>
</div>
</div>

         

        </div>

      </div>

    </>
  );
}

export default PatientDashboard;