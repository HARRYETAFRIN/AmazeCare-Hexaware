import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import DoctorNavbar from "../components/DoctorNavbar";
import DoctorSidebar from "../components/DoctorSidebar";
import * as bootstrap from "bootstrap";
function DoctorMedicalRecords() {
  const doctorId = localStorage.getItem("doctorId");

  const location = useLocation();
  const navigate = useNavigate();

  const selectedAppointment =
    location.state?.appointmentId
      ? location.state
      : null;

  const editMode = location.state?.editMode || false;

  const editingRecord =
    location.state?.record || null;

  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [medicalRecord, setMedicalRecord] =
    useState({
      appointmentId:
        editingRecord?.appointmentId ||
        selectedAppointment?.appointmentId ||
        "",

      diagnosis:
        editingRecord?.diagnosis || "",

      treatmentPlan:
        editingRecord?.treatmentPlan || "",

      prescription:
        editingRecord?.prescription || "",

      recommendedTests:
        editingRecord?.recommendedTests || "",
    });

  useEffect(() => {
    fetchRecords();

    if (!selectedAppointment) {
      fetchAppointments();
    }
  }, []);

  useEffect(() => {
    if (editMode && editingRecord) {
      setEditingId(editingRecord.medicalRecordId);
    }
  }, []);

 useEffect(() => {
  if (selectedAppointment || editMode) {
   const modalElement = document.getElementById("medicalRecordModal");

   if (modalElement) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
modal.show();
     modal.show();
   }
 }
}, [selectedAppointment, editMode]);

  const fetchRecords = async () => {
    try {
      const res = await api.get(
        `/MedicalRecord/doctor/${doctorId}`
      );

      setRecords(res.data);
    } catch (err) {
      console.log(err);
      setRecords([]);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get(
        `/Appointment/doctor/${doctorId}`
      );

      setAppointments(res.data);
    } catch (err) {
      console.log(err);
      setAppointments([]);
    }
  };

  const handleChange = (e) => {
    setMedicalRecord({
      ...medicalRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (record) => {
    setEditingId(record.medicalRecordId);

    setMedicalRecord({
      appointmentId: record.appointmentId,
      diagnosis: record.diagnosis,
      treatmentPlan: record.treatmentPlan,
      prescription: record.prescription,
      recommendedTests:
        record.recommendedTests,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this medical record?"
      )
    )
      return;

    try {
      await api.delete(
        `/MedicalRecord/${id}`
      );

      alert(
        "Medical Record Deleted Successfully"
      );

      fetchRecords();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const handleAdd = async () => {
    if (
      medicalRecord.appointmentId === ""
    ) {
      alert(
        "Please select an appointment"
      );
      return;
    }

    try {
      if (editingId) {
        await api.put(
          `/MedicalRecord/${editingId}`,
          medicalRecord
        );

        alert(
          "Medical Record Updated Successfully"
        );

        setEditingId(null);
      } else {
        await api.post(
          "/MedicalRecord",
          medicalRecord
        );

        alert(
          "Medical Record Added Successfully"
        );
      }

      setMedicalRecord({
        appointmentId:
          selectedAppointment?.appointmentId ||
          "",

        diagnosis: "",
        treatmentPlan: "",
        prescription: "",
        recommendedTests: "",
      });

      setEditingId(null);

      fetchRecords();

      if (
        selectedAppointment ||
        editMode
      ) {
        navigate(
          "/doctor/appointments"
        );
      }
    } catch (err) {
      console.log(err);
      alert(
        "Failed to Add Medical Record"
      );
    }
  };

  return (
    <>
      <DoctorNavbar />

      <div className="d-flex">

        <DoctorSidebar />

        <div className="container mt-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>Medical Records</h2>

            {!selectedAppointment &&
              !editMode && (
                <button
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#medicalRecordModal"
                  onClick={() => {
                    setEditingId(null);

                    setMedicalRecord({
                      appointmentId: "",
                      diagnosis: "",
                      treatmentPlan: "",
                      prescription: "",
                      recommendedTests: "",
                    });
                  }}
                >
                  + Add Medical Record
                </button>
              )}

          </div>
          {!selectedAppointment && !editMode && (

<table className="table table-bordered table-striped">

  <thead className="table-dark">

    <tr>
      <th>Record ID</th>
      <th>Appointment ID</th>
      <th>Diagnosis</th>
      <th>Treatment Plan</th>
      <th>Prescription</th>
      <th>Recommended Tests</th>
      <th>Action</th>
    </tr>

  </thead>

  <tbody>

    {records.length === 0 ? (

      <tr>

        <td
          colSpan="7"
          className="text-center"
        >
          No Medical Records Found
        </td>

      </tr>

    ) : (

      records.map((record) => (

        <tr key={record.medicalRecordId}>

          <td>{record.medicalRecordId}</td>

          <td>{record.appointmentId}</td>

          <td>{record.diagnosis}</td>

          <td>{record.treatmentPlan}</td>

          <td>{record.prescription}</td>

          <td>{record.recommendedTests}</td>

          <td>

            <button
              className="btn btn-warning btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#medicalRecordModal"
              onClick={() => handleEdit(record)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                handleDelete(record.medicalRecordId)
              }
            >
              Delete
            </button>

          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

)}
<div
  className="modal fade"
  id="medicalRecordModal"
  tabIndex="-1"
>
  <div className="modal-dialog modal-lg">

    <div className="modal-content">

      <div className="modal-header">

        <h5 className="modal-title">

          {editingId
            ? "Edit Medical Record"
            : "Add Medical Record"}

        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div className="modal-body">

    {selectedAppointment || editMode ? (

  <div className="row">

    <div className="col-md-6 mb-3">
      <label>Appointment ID</label>

      <input
        className="form-control"
        value={
          selectedAppointment?.appointmentId ||
          editingRecord?.appointmentId
        }
        readOnly
      />
    </div>

    {!editMode && (
      <div className="col-md-6 mb-3">
        <label>Patient ID</label>

        <input
          className="form-control"
          value={selectedAppointment?.patientId}
          readOnly
        />
      </div>
    )}

  </div>

) : (

  <div className="mb-3">

    <label className="form-label">
      Appointment
    </label>

    <select
      className="form-control"
      name="appointmentId"
      value={medicalRecord.appointmentId}
      onChange={handleChange}
    >
      <option value="">
        Select Appointment
      </option>

      {appointments.map((a) => (
        <option
          key={a.appointmentId}
          value={a.appointmentId}
        >
          Appointment #{a.appointmentId}
        </option>
      ))}

    </select>

  </div>

)}

<div className="mb-3">
  <label>Diagnosis</label>

  <input
    className="form-control"
    name="diagnosis"
    value={medicalRecord.diagnosis}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Treatment Plan</label>

  <textarea
    className="form-control"
    rows="2"
    name="treatmentPlan"
    value={medicalRecord.treatmentPlan}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Prescription</label>

  <textarea
    className="form-control"
    rows="2"
    name="prescription"
    value={medicalRecord.prescription}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Recommended Tests</label>

  <input
    className="form-control"
    name="recommendedTests"
    value={medicalRecord.recommendedTests}
    onChange={handleChange}
  />
</div>

<button
  className={`btn ${
    editingId
      ? "btn-warning"
      : "btn-success"
  } w-100`}
  onClick={handleAdd}
  data-bs-dismiss="modal"
>
  {editingId
    ? "Update Medical Record"
    : "Add Medical Record"}
</button>

      </div>

    </div>

  </div>

</div>

        </div>

      </div>

    </>
  );
}

export default DoctorMedicalRecords;