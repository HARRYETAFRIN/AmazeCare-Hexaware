import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import timeSlots from "../utils/timeSlots";
import * as bootstrap from "bootstrap";
function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [appointmentId, setAppointmentId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [visitType, setVisitType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/Appointment");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAvailableSlots = async (doctor, date) => {
  try {
    const res = await api.get(
      `/Appointment/availableSlots/${doctor}?date=${date}`
    );

    let bookedSlots = res.data;

    const freeSlots = timeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    setAvailableSlots(freeSlots);
  } catch (err) {
    console.log(err);
    setAvailableSlots(timeSlots);
  }
};

  const handleSubmit = async () => {
  const data = {
    patientId: Number(patientId),
    doctorId: Number(doctorId),
    symptoms,
    visitType,
    appointmentDate,
    appointmentTime: appointmentTime || null,
  };

  try {
    await api.post("/Appointment", data);

    alert("Appointment Added Successfully");

    setPatientId("");
    setDoctorId("");
    setSymptoms("");
    setVisitType("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAvailableSlots([]);

    fetchAppointments();
  } catch (err) {
    console.log(err);

    if (err.response?.data?.message) {
      alert(err.response.data.message[0]);
    } else {
      alert("Operation Failed");
    }
  }
};
  const handleEdit = (appointment) => {
    setAppointmentId(appointment.appointmentId);
    setPatientId(appointment.patientId);
    setDoctorId(appointment.doctorId);
    setSymptoms(appointment.symptoms);
    setVisitType(appointment.visitType);

    setAppointmentDate(
      appointment.appointmentDate?.split("T")[0]
    );

    if (appointment.appointmentTime) {
      setAppointmentTime(
        appointment.appointmentTime.substring(0, 5)
      );
    } else {
      setAppointmentTime("");
    }
    fetchAvailableSlots(
  appointment.doctorId,
  appointment.appointmentDate.split("T")[0]
);

    setStatus(appointment.status);
  };

  const handleUpdate = async () => {
  const data = {
    appointmentId: Number(appointmentId),
    patientId: Number(patientId),
    doctorId: Number(doctorId),
    symptoms,
    visitType,
    appointmentDate,
    appointmentTime: appointmentTime || null,
    status,
  };

  try {
    await api.put(`/Appointment/${appointmentId}`, data);

    alert("Appointment Updated Successfully");

    setAppointmentId("");
    setPatientId("");
    setDoctorId("");
    setSymptoms("");
    setVisitType("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAvailableSlots([]);
    setStatus("");

    fetchAppointments();
  } catch (err) {
    console.log(err);

    if (err.response?.data?.message) {
      alert(err.response.data.message[0]);
    } else {
      alert("Operation Failed");
    }
  }
};
  const handleDelete = async (id) => {
  try {
    await api.delete(`/Appointment/${id}`);

    alert("Appointment Deleted Successfully");

    fetchAppointments();
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container mt-4">
          <h2>Appointments Management</h2>

         <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#appointmentModal"
    onClick={() => {
      setAppointmentId("");
      setPatientId("");
      setDoctorId("");
      setSymptoms("");
      setVisitType("");
      setAppointmentDate("");
      setAppointmentTime("");
      setStatus("");
      setAvailableSlots([]);
    }}
  >
    + Add Appointment
  </button>
</div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Symptoms</th>
                <th>Visit Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.appointmentId}>
                  <td>{a.appointmentId}</td>
                  <td>{a.patientId}</td>
                  <td>{a.doctorId}</td>
                  <td>{a.symptoms}</td>
                  <td>{a.visitType}</td>

                  <td>
                    {a.appointmentDate?.split("T")[0]}
                  </td>

                  <td>
                    {a.appointmentTime
                      ? a.appointmentTime.substring(
                          0,
                          5
                        )
                      : "-"}
                  </td>

                  <td>{a.status}</td>

                  <td>
                   <button
  className="btn btn-warning btn-sm me-2"
  data-bs-toggle="modal"
  data-bs-target="#appointmentModal"
  onClick={() => handleEdit(a)}
>
  Edit
</button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(
                          a.appointmentId
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
  className="modal fade"
  id="appointmentModal"
  tabIndex="-1"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      <div className="modal-header">

        <h5 className="modal-title">
          {appointmentId
            ? "Edit Appointment"
            : "Add Appointment"}
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div className="modal-body">

        <>
            <input
              type="number"
              placeholder="Patient ID"
              className="form-control mb-2"
              value={patientId}
              onChange={(e) =>
                setPatientId(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Doctor ID"
              className="form-control mb-2"
              value={doctorId}
              onChange={(e) => {
  setDoctorId(e.target.value);

  if (appointmentDate !== "") {
    fetchAvailableSlots(
      e.target.value,
      appointmentDate
    );
  }
}}
            />

            <input
              type="text"
              placeholder="Symptoms"
              className="form-control mb-2"
              value={symptoms}
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
            />

            <select
  className="form-control mb-2"
  value={visitType}
  onChange={(e) => setVisitType(e.target.value)}
>
  <option value="">Select Visit Type</option>
  <option value="Consultation">Consultation</option>
  <option value="Follow-up">Follow-up</option>
  <option value="Emergency">Emergency</option>
</select>

            <input
              type="date"
              className="form-control mb-2"
              value={appointmentDate}
             onChange={(e) => {
  setAppointmentDate(e.target.value);

  if (doctorId !== "") {
    fetchAvailableSlots(
      doctorId,
      e.target.value
    );
  }
}}
            />

           <select
  className="form-control mb-2"
  value={appointmentTime}
  onChange={(e) =>
    setAppointmentTime(e.target.value)
  }
>
  <option value="">
    Select Time Slot
  </option>

  {availableSlots.map((slot) => (
    <option
      key={slot}
      value={slot}
    >
      {slot.substring(0, 5)}
    </option>
  ))}
</select>

            {appointmentId && (
              <select
                className="form-control mb-2"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="">
                  Select Status
                </option>
               
                <option value="Booked">
                  Booked
                </option>
                <option value="Completed">
                  Completed
                </option>
                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            )}

            {appointmentId ? (
              <button
                type="button"
                className="btn btn-warning w-100 mb-3"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update Appointment
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-100 mb-3"
                 data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Add Appointment
              </button>
            )}
          </>

      </div>

    </div>
  </div>
</div>
    </>
  );
}

export default Appointments;