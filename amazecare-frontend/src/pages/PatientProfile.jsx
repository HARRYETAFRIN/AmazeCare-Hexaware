import { useEffect, useState } from "react";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

function PatientProfile() {

  const patientId = localStorage.getItem("patientId");

  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/Patient/${patientId}`);
      setPatient(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/Patient/${patient.patientId}`, patient);

      alert("Profile Updated Successfully");

      setIsEditing(false);

      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  if (!patient)
    return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <>
      <PatientNavbar />

      <div className="d-flex">

        <PatientSidebar />

        <div className="container mt-4">

          <h2 className="mb-4">My Profile</h2>

          <div className="card shadow p-4">

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Full Name</label>
                <input
                  className="form-control"
                  value={patient.fullName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={patient.dateOfBirth?.split("T")[0]}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Gender</label>
                <select
                  className="form-control"
                  value={patient.gender}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>


              <div className="col-md-6 mb-3">
                <label>Mobile Number</label>
                <input
                  className="form-control"
                  value={patient.mobileNumber}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      mobileNumber: e.target.value,
                    })
                  }
                />
              </div>

              

            </div>

            <div className="mt-3">

              {!isEditing ? (

                <button
                  className="btn btn-warning"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>

              ) : (

                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                  >
                    Cancel
                  </button>
                </>

              )}

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default PatientProfile;