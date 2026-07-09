import { useEffect, useState } from "react";
import Navbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    qualification: "",
    designation: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const res = await api.get("/Doctor");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await api.put(`/Doctor/${editId}`, {
          doctorId: editId,
          ...form,
        });

        alert("Doctor Updated");
      } else {
        await api.post("/Doctor", form);
        alert("Doctor Added");
      }

      setForm({
        name: "",
        specialization: "",
        experience: "",
        qualification: "",
        designation: "",
      });

      setEditId(null);
      getDoctors();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (doctor) => {
    setEditId(doctor.doctorId);

    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      qualification: doctor.qualification,
      designation: doctor.designation,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Doctor/${id}`);
      alert("Doctor Deleted");
      getDoctors();
    } catch (err) {
      console.log(err);
    }
  };

 return (
  <>
    <Navbar />

    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">

        <h2>Doctors Management</h2>

        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#doctorModal"
            onClick={() => {
              setEditId(null);

              setForm({
                name: "",
                specialization: "",
                experience: "",
                qualification: "",
                designation: "",
              });
            }}
          >
            + Add Doctor
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((d) => (
              <tr key={d.doctorId}>
                <td>{d.doctorId}</td>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.experience}</td>
                <td>{d.qualification}</td>
                <td>{d.designation}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#doctorModal"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(d.doctorId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}

        <div
          className="modal fade"
          id="doctorModal"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  {editId ? "Edit Doctor" : "Add Doctor"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">

                <input
                  className="form-control mb-2"
                  placeholder="Doctor Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Specialization"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Designation"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                />

                <button
                  className={`btn ${
                    editId
                      ? "btn-warning"
                      : "btn-primary"
                  } w-100`}
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                >
                  {editId
                    ? "Update Doctor"
                    : "Add Doctor"}
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

export default Doctors;