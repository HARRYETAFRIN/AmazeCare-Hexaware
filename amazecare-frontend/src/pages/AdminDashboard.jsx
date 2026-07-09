import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const doctorRes = await api.get("/Doctor");
      setDoctors(doctorRes.data);

      const patientRes = await api.get("/Patient");
      setPatients(patientRes.data);

      const appointmentRes = await api.get("/Appointment");
      setAppointments(appointmentRes.data);

      const recordRes = await api.get("/MedicalRecord");
      setRecords(recordRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <div className="container-fluid">
        <div className="row">

          <div className="col-auto p-0">
            <Sidebar />
          </div>

          <div className="col p-4">
            <h2 className="fw-bold">
  Welcome, Admin 
</h2>

<p className="text-muted mb-4">
  Monitor and manage the hospital system efficiently.
</p>

            <div className="row mt-4">

              <div
                className="col-md-3"
                onClick={() => navigate("/doctors")}
                style={{ cursor: "pointer" }}
              >
                <DashboardCard
                  title="Doctors"
                  count={doctors.length}
                />
              </div>

              <div
                className="col-md-3"
                onClick={() => navigate("/patients")}
                style={{ cursor: "pointer" }}
              >
                <DashboardCard
                  title="Patients"
                  count={patients.length}
                />
              </div>

              <div
                className="col-md-3"
                onClick={() => navigate("/appointments")}
                style={{ cursor: "pointer" }}
              >
                <DashboardCard
                  title="Appointments"
                  count={appointments.length}
                />
              </div>

              <div
                className="col-md-3"
                onClick={() => navigate("/medicalrecords")}
                style={{ cursor: "pointer" }}
              >
                <DashboardCard
                  title="Records"
                  count={records.length}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;