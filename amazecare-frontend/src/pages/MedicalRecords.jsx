import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";

function MedicalRecords() {
  const [records, setRecords] = useState([]);

  const [editing, setEditing] = useState(false);

  const [medicalRecord, setMedicalRecord] = useState({
    medicalRecordId: "",
    appointmentId: "",
    diagnosis: "",
    treatmentPlan: "",
    prescription: "",
    recommendedTests: "",
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/MedicalRecord");
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMedicalRecord({
      ...medicalRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (record) => {
    setEditing(true);

    setMedicalRecord({
      medicalRecordId: record.medicalRecordId,
      appointmentId: record.appointmentId,
      diagnosis: record.diagnosis,
      treatmentPlan: record.treatmentPlan,
      prescription: record.prescription,
      recommendedTests: record.recommendedTests,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(
        `/MedicalRecord/${medicalRecord.medicalRecordId}`,
        {
          appointmentId: medicalRecord.appointmentId,
          diagnosis: medicalRecord.diagnosis,
          treatmentPlan: medicalRecord.treatmentPlan,
          prescription: medicalRecord.prescription,
          recommendedTests: medicalRecord.recommendedTests,
        }
      );

      alert("Medical Record Updated Successfully");

      setEditing(false);

      setMedicalRecord({
        medicalRecordId: "",
        appointmentId: "",
        diagnosis: "",
        treatmentPlan: "",
        prescription: "",
        recommendedTests: "",
      });

      fetchRecords();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const handleCancel = () => {
    setEditing(false);

    setMedicalRecord({
      medicalRecordId: "",
      appointmentId: "",
      diagnosis: "",
      treatmentPlan: "",
      prescription: "",
      recommendedTests: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Medical Record?")) return;

    try {
      await api.delete(`/MedicalRecord/${id}`);

      alert("Medical Record Deleted Successfully");

      fetchRecords();
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

          <h2>Medical Records Management</h2>

          {editing && (
            <div className="card shadow p-4 mb-4">

              <h4 className="mb-3 text-primary">
                Update Medical Record
              </h4>

              <div className="mb-3">
                <label>Appointment ID</label>
                <input
                  className="form-control"
                  value={medicalRecord.appointmentId}
                  readOnly
                />
              </div>

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
                  rows="2"
                  className="form-control"
                  name="treatmentPlan"
                  value={medicalRecord.treatmentPlan}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Prescription</label>
                <textarea
                  rows="2"
                  className="form-control"
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

              <div className="d-flex gap-2">

                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  Update Medical Record
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

          <table className="table table-bordered table-striped mt-4">

            <thead className="table-dark">

              <tr>
                <th>Record ID</th>
                <th>Appointment ID</th>
                <th>Diagnosis</th>
                <th>Treatment Plan</th>
                <th>Prescription</th>
                <th>Recommended Tests</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

            </thead>

            <tbody>

              {records.length > 0 ? (
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
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                    </td>

                    <td>
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
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center"
                  >
                    No Medical Records Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>
    </>
  );
}

export default MedicalRecords;