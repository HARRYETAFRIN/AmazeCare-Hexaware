import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";
import timeSlots from "../utils/timeSlots";

function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const isReschedule = location.state?.reschedule || false;
  const existingAppointment = location.state?.appointment || null;

  const doctor = isReschedule
    ? {
        doctorId: existingAppointment.doctorId,
        name: existingAppointment.doctorName || existingAppointment.doctorId,
      }
    : location.state;

  if (!doctor) {
    return (
      <>
        <PatientNavbar />

        <div className="d-flex">
          <PatientSidebar />

          <div className="container mt-4">
            <div className="alert alert-warning">
              Please select a doctor from the
              <strong> Available Doctors </strong>
              page first.
            </div>
          </div>
        </div>
      </>
    );
  }

  const patientId = localStorage.getItem("patientId");

  const [appointment, setAppointment] = useState({
    symptoms: existingAppointment?.symptoms || "",
    visitType: existingAppointment?.visitType || "",
    appointmentDate:
      existingAppointment?.appointmentDate?.split("T")[0] || "",
    appointmentTime:
      existingAppointment?.appointmentTime?.substring(0, 5) || "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (appointment.appointmentDate !== "") {
      fetchAvailableSlots(appointment.appointmentDate);
    } else {
      setAvailableSlots(timeSlots);
    }
  }, []);

  const fetchAvailableSlots = async (date) => {
    try {
      const res = await api.get(
        `/Appointment/availableSlots/${doctor.doctorId}?date=${date}`
      );

      let bookedSlots = res.data;

      
      if (
        isReschedule &&
        date === existingAppointment.appointmentDate.split("T")[0]
      ) {
        bookedSlots = bookedSlots.filter(
          (slot) => slot !== existingAppointment.appointmentTime
        );
      }

      const freeSlots = timeSlots.filter(
        (slot) => !bookedSlots.includes(slot)
      );

      setAvailableSlots(freeSlots);
    } catch (err) {
      console.log(err);
      setAvailableSlots(timeSlots);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAppointment({
      ...appointment,
      [name]: value,
    });

    if (name === "appointmentDate") {
      fetchAvailableSlots(value);
    }
  };

  const handleBook = async () => {
    if (
      appointment.appointmentDate === "" ||
      appointment.appointmentTime === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isReschedule) {
        await api.put(
          `/Appointment/reschedule/${existingAppointment.appointmentId}`,
          {
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
          }
        );

        alert("Appointment Rescheduled Successfully");
      } else {
        const data = {
          patientId: Number(patientId),
          doctorId: doctor.doctorId,
          symptoms: appointment.symptoms,
          visitType: appointment.visitType,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
        };

        await api.post("/Appointment", data);

        alert("Appointment Booked Successfully");
      }

      navigate("/patient/appointments");
    } catch (err) {
      console.log(err);
       if (err.response?.data?.Message) {
    alert(err.response.data.Message[0]);
  } 
  else if (err.response?.data?.message) {
    alert(err.response.data.message[0]);
  } 
  else {
    alert("Operation Failed");
  }
}
  };
    return (
    <>
      <PatientNavbar />

      <div className="d-flex">
        <PatientSidebar />

        <div className="container mt-4">

          <h2 className="mb-4">
            {isReschedule
              ? "Reschedule Appointment"
              : "Book Appointment"}
          </h2>

          <div className="card shadow p-4">

            <div className="mb-3">
              <label className="form-label">
                Doctor
              </label>

              <input
                className="form-control"
                value={`Dr. ${doctor.name}`}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label>Symptoms</label>

              <textarea
                className="form-control"
                rows="3"
                name="symptoms"
                value={appointment.symptoms}
                onChange={handleChange}
                readOnly={isReschedule}
              />
            </div>

            <div className="mb-3">
              <label>Visit Type</label>

              <select
                className="form-control"
                name="visitType"
                value={appointment.visitType}
                onChange={handleChange}
                disabled={isReschedule}
              >
                <option value="">
                  Select Visit Type
                </option>

                <option value="Consultation">
                  Consultation
                </option>

                <option value="Follow-up">
                  Follow-up
                </option>

                <option value="Emergency">
                  Emergency
                </option>

              </select>

            </div>

            <div className="mb-3">
              <label>Appointment Date</label>

              <input
                type="date"
                className="form-control"
                name="appointmentDate"
                value={appointment.appointmentDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Available Time Slots</label>

              <select
                className="form-control"
                name="appointmentTime"
                value={appointment.appointmentTime}
                onChange={handleChange}
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

            </div>

            <button
              className={`btn ${
                isReschedule
                  ? "btn-warning"
                  : "btn-success"
              }`}
              onClick={handleBook}
            >
              {isReschedule
                ? "Update Appointment"
                : "Book Appointment"}
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default BookAppointment;