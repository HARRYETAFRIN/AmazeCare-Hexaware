import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DoctorNavbar from "../components/DoctorNavbar";
import DoctorSidebar from "../components/DoctorSidebar";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const doctorId = payload.DoctorId;

     
      try {
        const appointmentRes = await api.get(
          `/Appointment/doctor/${doctorId}`
        );

        const appointmentData = appointmentRes.data;

        setAppointments(appointmentData);

        const uniquePatients = [
          ...new Set(
            appointmentData.map((a) => a.patientId)
          ),
        ];

        setPatientsCount(uniquePatients.length);

        setCompletedCount(
          appointmentData.filter(
            (a) => a.status === "Completed"
          ).length
        );

        const today = new Date();
today.setHours(0, 0, 0, 0);

setUpcomingCount(
  appointmentData.filter(
    (a) =>
      a.status === "Booked" &&
      new Date(a.appointmentDate) >= today
  ).length
);
      } catch {
        setAppointments([]);
        setPatientsCount(0);
        setCompletedCount(0);
        setUpcomingCount(0);
      }

      
      try {
        const medicalRes = await api.get(
          `/MedicalRecord/doctor/${doctorId}`
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
      <DoctorNavbar />

      <div className="d-flex">

        <DoctorSidebar />

        <div className="container-fluid p-4">

          <div className="bg-white rounded shadow-sm p-4 mb-4">

            <h1 className="fw-bold">
              Welcome, Doctor
            </h1>

            <p className="text-muted mb-0">
              Manage your appointments, patients and medical records.
            </p>

          </div>

          <div className="row">

            {/* Appointments */}

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              onClick={() =>
               navigate("/doctor/appointments", {
    state: { upcoming: false },
  })
              }
              style={{ cursor: "pointer" }}
            >
              <div className="dashboard-card">

                <i
                  className="bi bi-calendar-check"
                  style={{
                    fontSize: "40px",
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

            {/* Patients */}

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              onClick={() =>
                navigate("/doctor/patients")
              }
              style={{ cursor: "pointer" }}
            >
              <div className="dashboard-card">

                <i
                  className="bi bi-people-fill"
                  style={{
                    fontSize: "40px",
                    color: "#222",
                    marginBottom: "15px",
                  }}
                ></i>

                <h4>Patients</h4>

                <h2 className="text-primary">
                  {patientsCount}
                </h2>

              </div>
            </div>

            {/* Medical Records */}

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              onClick={() =>
                navigate("/doctor/medicalrecords")
              }
              style={{ cursor: "pointer" }}
            >
              <div className="dashboard-card">

                <i
                  className="bi bi-file-medical"
                  style={{
                    fontSize: "40px",
                    color: "#222",
                    marginBottom: "15px",
                  }}
                ></i>

               <h5
  className="col-lg-3 col-md-4 col-sm-6 mb-4"
  style={{
    whiteSpace: "nowrap",
    fontWeight: "600",
  }}
>
  Medical Records
</h5>

                <h2 className="text-primary">
                  {medicalRecords.length}
                </h2>

              </div>
            </div>

            {/* Completed */}

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              onClick={() =>
                navigate("/doctor/appointments")
              }
              style={{ cursor: "pointer" }}
            >
              <div className="dashboard-card">

                <i
                  className="bi bi-check-circle"
                  style={{
                    fontSize: "40px",
                    color: "#222",
                    marginBottom: "15px",
                  }}
                ></i>

                <h4>Completed</h4>

                <h2 className="text-primary">
                  {completedCount}
                </h2>

              </div>
            </div>
            <div
  className="col-lg-3 col-md-4 col-sm-6 mb-4"
  onClick={() =>
    navigate("/doctor/appointments", {
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
      className="col-lg-3 col-md-4 col-sm-6 mb-4"
      style={{
        whiteSpace: "nowrap",
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

export default DoctorDashboard;