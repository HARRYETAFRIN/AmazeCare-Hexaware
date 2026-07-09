import { Link, useLocation } from "react-router-dom";

function DoctorSidebar() {

  const location = useLocation();

  return (
    <div
      className="bg-white border-end"
      style={{
        width: "280px",
        minHeight: "100vh",
        padding: "25px",
      }}
    >

      <h2
        className="fw-bold text-primary mb-4"
      >
        AmazeCare
      </h2>

      <Link
        to="/doctor"
        className={`d-flex align-items-center text-decoration-none mb-2 ${
          location.pathname === "/doctor"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        style={{
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        <i className="bi bi-speedometer2 me-3"></i>
        Dashboard
      </Link>

      <Link
        to="/doctor/patients"
        className={`d-flex align-items-center text-decoration-none mb-2 ${
          location.pathname === "/doctor/patients"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        style={{
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        <i className="bi bi-people-fill me-3"></i>
        Patients
      </Link>

      <Link
        to="/doctor/appointments"
        className={`d-flex align-items-center text-decoration-none mb-2 ${
          location.pathname === "/doctor/appointments"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        style={{
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        <i className="bi bi-calendar-check me-3"></i>
        Appointments
      </Link>

      <Link
        to="/doctor/medicalrecords"
        className={`d-flex align-items-center text-decoration-none mb-2 ${
          location.pathname === "/doctor/medicalrecords"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        style={{
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        <i className="bi bi-file-medical me-3"></i>
        Medical Records
      </Link>

      <Link
        to="/doctor/profile"
        className={`d-flex align-items-center text-decoration-none mb-2 ${
          location.pathname === "/doctor/profile"
            ? "bg-primary text-white"
            : "text-dark"
        }`}
        style={{
          padding: "14px 18px",
          borderRadius: "10px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        <i className="bi bi-person-circle me-3"></i>
        My Profile
      </Link>

    </div>
  );
}

export default DoctorSidebar;