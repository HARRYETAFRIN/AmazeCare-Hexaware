import { useEffect, useState } from "react";
import { useNavigate,  useLocation,} from "react-router-dom";
import api from "../services/api";
import DoctorNavbar from "../components/DoctorNavbar";
import DoctorSidebar from "../components/DoctorSidebar";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

const [showUpcoming, setShowUpcoming] = useState(
  location.state?.upcoming || false
);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const doctorId = payload.DoctorId;

      const res = await api.get(
        `/Appointment/doctor/${doctorId}`
      );

      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.put(`/Appointment/cancel/${id}`);

      alert("Appointment Cancelled");

      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  const editMedicalRecord = async (appointmentId) => {
    try {
      const res = await api.get(
        `/MedicalRecord/appointment/${appointmentId}`
      );

      navigate("/doctor/medicalrecords", {
        state: {
          editMode: true,
          record: res.data,
        },
      });
    } catch (err) {
      console.log(err);
      alert("Medical Record not found");
    }
  };
const today = new Date();
today.setHours(0, 0, 0, 0);

const displayedAppointments = showUpcoming
  ? appointments.filter(
      (a) =>
        a.status === "Booked" &&
        new Date(a.appointmentDate) >= today
    )
  : appointments;
  return (
    <>
      <DoctorNavbar />

      <div className="d-flex">
        <DoctorSidebar />

        <div className="container mt-4">

          <h2>Appointments</h2>
           <div className="mb-3">

  <button
    className={`btn me-2 ${
      !showUpcoming
        ? "btn-primary"
        : "btn-outline-primary"
    }`}
    onClick={() => setShowUpcoming(false)}
  >
    All Appointments
  </button>

  <button
    className={`btn ${
      showUpcoming
        ? "btn-success"
        : "btn-outline-success"
    }`}
    onClick={() => setShowUpcoming(true)}
  >
    Upcoming Appointments
  </button>

</div>
          <table className="table table-bordered table-hover mt-4">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Symptoms</th>
                <th>Visit Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {displayedAppointments.map((a) => (

                <tr key={a.appointmentId}>

                  <td>{a.appointmentId}</td>

                  <td>{a.patientId}</td>

                  <td>{a.symptoms}</td>

                  <td>{a.visitType}</td>

                  <td>{a.appointmentDate?.split("T")[0]}</td>
                  <td>
  {new Date(`1970-01-01T${a.appointmentTime}`)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
</td>

                  <td>

                    {a.status === "Booked" && (
                      <span className="badge bg-warning text-dark">
                        Booked
                      </span>
                    )}

                    {a.status === "Completed" && (
                      <span className="badge bg-success">
                        Completed
                      </span>
                    )}

                    {a.status === "Cancelled" && (
                      <span className="badge bg-danger">
                        Cancelled
                      </span>
                    )}

                  </td>

                  <td>

                    {a.status === "Booked" ? (
                      <>
                       <button
  className="btn btn-primary btn-sm me-2"
  onClick={() =>
    navigate("/doctor/medicalrecords", {
      state: {
        appointmentId: a.appointmentId,
        patientId: a.patientId,
      },
    })
  }
>
  Add Record
</button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            cancelAppointment(a.appointmentId)
                          }
                        >
                          Cancel
                        </button>
                      </>
                    ) : a.status === "Completed" ? (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() =>
                          editMedicalRecord(a.appointmentId)
                        }
                      >
                        Edit Record
                      </button>
                    ) : (
                      <span className="text-muted">
                        No Action
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default DoctorAppointments;