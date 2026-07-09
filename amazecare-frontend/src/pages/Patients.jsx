import { useEffect, useState } from "react";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/Patient");
      setPatients(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  if (
    formData.fullName.trim() === "" ||
    formData.dateOfBirth === "" ||
    formData.gender.trim() === "" ||
    formData.mobileNumber.trim() === ""
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    if (editingId === null) {
      await api.post("/Patient", formData);
      alert("Patient Added Successfully");
    } else {
      await api.put(`/Patient/${editingId}`, formData);
      alert("Patient Updated Successfully");
      setEditingId(null);
    }

    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      mobileNumber: "",
    });

    fetchPatients();
  } catch (err) {
    console.log(err);

    if (err.response?.data?.Message) {
      alert(err.response.data.Message[0]);
    } else {
      alert("Something went wrong");
    }
  }
};

  const handleEdit = (patient) => {
    setEditingId(patient.patientId);

    setFormData({
      fullName: patient.fullName,
      dateOfBirth: patient.dateOfBirth.split("T")[0],
      gender: patient.gender,
      mobileNumber: patient.mobileNumber,
    });
  };

 const handleDelete = async (id) => {
  try {
    await api.delete(`/Patient/${id}`);
    alert("Patient Deleted Successfully");
    fetchPatients();
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col p-5">
            <h2>Patients Management</h2>

           <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#patientModal"
    onClick={() => {
      setEditingId(null);

      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        mobileNumber: "",
      });
    }}
  >
    + Add Patient
  </button>
</div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Mobile Number</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.fullName}</td>
                    <td>
                      {patient.dateOfBirth.split("T")[0]}
                    </td>
                    <td>{patient.gender}</td>
                    <td>{patient.mobileNumber}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
  handleEdit(patient);
}}
data-bs-toggle="modal"
data-bs-target="#patientModal"
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(patient.patientId)
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
      </div>
      <div
  className="modal fade"
  id="patientModal"
  tabIndex="-1"
>
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">

        <h5 className="modal-title">
          {editingId
            ? "Edit Patient"
            : "Add Patient"}
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>

      </div>

      <div className="modal-body">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="form-control mb-2"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfBirth"
          className="form-control mb-2"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />

       <select
  name="gender"
  className="form-control mb-2"
  value={formData.gender}
  onChange={handleChange}
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          className="form-control mb-3"
          value={formData.mobileNumber}
          onChange={handleChange}
        />

        <button
          className={`btn ${
            editingId
              ? "btn-warning"
              : "btn-primary"
          } w-100`}
          onClick={handleSubmit}
          data-bs-dismiss="modal"
        >
          {editingId
            ? "Update Patient"
            : "Add Patient"}
        </button>

      </div>

    </div>
  </div>
</div>
    </>
  );
}

export default Patients;