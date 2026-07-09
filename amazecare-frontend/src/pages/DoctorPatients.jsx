import { useEffect, useState } from "react";
import api from "../services/api";
import DoctorNavbar from "../components/DoctorNavbar";
import DoctorSidebar from "../components/DoctorSidebar";

function DoctorPatients() {
  const doctorId = localStorage.getItem("doctorId");

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get(`/Patient/doctor/${doctorId}`);
      setPatients(res.data);
    } catch (err) {
      console.log(err);
      setPatients([]);
    }
  };

  return (
    <>
      <DoctorNavbar />

      <div className="d-flex">
        <DoctorSidebar />

        <div className="container mt-4">
          <h2>My Patients</h2>

          <table className="table table-bordered mt-4">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Mobile Number</th>
              </tr>
            </thead>

            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Patients Found
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.patientId}>
                    <td>{p.patientId}</td>
                    <td>{p.fullName}</td>
                    <td>{p.dateOfBirth?.split("T")[0]}</td>
                    <td>{p.gender}</td>
                    <td>{p.mobileNumber}</td>
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

export default DoctorPatients;