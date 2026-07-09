import { useEffect, useState } from "react";
import api from "../services/api";
import DoctorNavbar from "../components/DoctorNavbar";
import DoctorSidebar from "../components/DoctorSidebar";

function DoctorProfile() {

  const doctorId = localStorage.getItem("doctorId");

  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/Doctor/${doctorId}`);
      setDoctor(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/Doctor/${doctor.doctorId}`, doctor);

      alert("Profile Updated Successfully");

      setIsEditing(false);

      fetchProfile();

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  if (!doctor)
    return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <>
      <DoctorNavbar />

      <div className="d-flex">

        <DoctorSidebar />

        <div className="container mt-4">

          <h2 className="mb-4">My Profile</h2>

          <div className="card shadow p-4">

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  value={doctor.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Specialization</label>
                <input
                  className="form-control"
                  value={doctor.specialization}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      specialization: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  value={doctor.experience}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      experience: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Qualification</label>
                <input
                  className="form-control"
                  value={doctor.qualification}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      qualification: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Designation</label>
                <input
                  className="form-control"
                  value={doctor.designation}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDoctor({
                      ...doctor,
                      designation: e.target.value,
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

export default DoctorProfile;