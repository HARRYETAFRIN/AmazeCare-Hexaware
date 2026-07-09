import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

const showUpcoming =
  location.state?.upcoming || false;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const patientId = payload.PatientId;

      const res = await api.get(
        `/Appointment/patient/${patientId}`
      );

      setAppointments(res.data);
    } catch (err) {
      console.log(err);
      setAppointments([]);
    }
  };

  const cancelAppointment = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this appointment?"
      )
    )
      return;

    try {
      await api.put(`/Appointment/cancel/${id}`);

      alert("Appointment Cancelled Successfully");

      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Failed to cancel appointment");
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
      <PatientNavbar />

      <div className="d-flex">
        <PatientSidebar />

        <div className="container mt-4">

          <h2>My Appointments</h2>

          <table className="table table-bordered table-hover mt-4">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Doctor ID</th>
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

                  <td>{a.doctorId}</td>

                  <td>{a.symptoms}</td>

                  <td>{a.visitType}</td>

                  <td>
                    {a.appointmentDate?.split("T")[0]}
                  </td>

                  <td>{a.appointmentTime}</td>

                  <td>

                    {a.status === "Booked" && (
                      <span className="badge bg-primary">
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

                    {(a.status === "Booked" 
                    ) && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate("/patient/bookappointment", {
                              state: {
                                reschedule: true,
                                appointment: a,
                              },
                            })
                          }
                        >
                          Reschedule
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
                    )}

                    {a.status === "Completed" && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate(
                            "/patient/medicalrecords",
                            {
                              state: {
                                appointmentId:
                                  a.appointmentId,
                              },
                            }
                          )
                        }
                      >
                        View Medical Record
                      </button>
                    )}

                    {a.status === "Cancelled" && (
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

export default PatientAppointments;