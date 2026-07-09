import { Link, useLocation } from "react-router-dom";

function PatientSidebar() {

  const location = useLocation();

  return (
    <div
      className="bg-white border-end p-3"
      style={{
        width: "290px",
        minHeight: "100vh",
      }}
    >

      <h3 className="fw-bold text-primary text-center mb-4">
        AmazeCare
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link
            to="/patient"
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === "/patient"
                ? "active bg-primary text-white"
                : "text-dark"
            }`}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/patient/doctors"
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === "/patient/doctors"
                ? "active bg-primary text-white"
                : "text-dark"
            }`}
          >
            <i className="bi bi-person-badge me-2"></i>
            Available Doctors
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/patient/appointments"
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === "/patient/appointments"
                ? "active bg-primary text-white"
                : "text-dark"
            }`}
          >
            <i className="bi bi-calendar-check me-2"></i>
            My Appointments
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/patient/medicalrecords"
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === "/patient/medicalrecords"
                ? "active bg-primary text-white"
                : "text-dark"
            }`}
          >
            <i className="bi bi-file-medical me-2"></i>
            Medical Records
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/patient/profile"
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === "/patient/profile"
                ? "active bg-primary text-white"
                : "text-dark"
            }`}
          >
            <i className="bi bi-person-circle me-2"></i>
            My Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default PatientSidebar;