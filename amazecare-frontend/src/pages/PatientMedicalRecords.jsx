import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

function PatientMedicalRecords() {

  const location = useLocation();

  const selectedAppointmentId =
    location.state?.appointmentId;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const patientId = payload.PatientId;

      const res = await api.get(
        `/MedicalRecord/patient/${patientId}`
      );

      if (selectedAppointmentId) {

        setRecords(
          res.data.filter(
            (r) =>
              r.appointmentId ===
              selectedAppointmentId
          )
        );

      } else {

        setRecords(res.data);

      }

    } catch (err) {

      console.log(err);

      setRecords([]);

    }

  };

  return (
    <>
      <PatientNavbar />

      <div className="d-flex">

        <PatientSidebar />

        <div className="container mt-4">

          <h2>
            {selectedAppointmentId
              ? "Consultation Details"
              : "My Medical Records"}
          </h2>

          <table className="table table-bordered table-striped mt-4">

            <thead className="table-dark">

              <tr>

                <th>Record ID</th>

                <th>Appointment ID</th>

                <th>Diagnosis</th>

                <th>Treatment Plan</th>

                <th>Prescription</th>

                <th>Recommended Tests</th>

              </tr>

            </thead>

            <tbody>

              {records.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No Medical Records Found
                  </td>

                </tr>

              ) : (

                records.map((r) => (

                  <tr key={r.medicalRecordId}>

                    <td>{r.medicalRecordId}</td>

                    <td>{r.appointmentId}</td>

                    <td>{r.diagnosis}</td>

                    <td>{r.treatmentPlan}</td>

                    <td>{r.prescription}</td>

                    <td>{r.recommendedTests}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}

export default PatientMedicalRecords;