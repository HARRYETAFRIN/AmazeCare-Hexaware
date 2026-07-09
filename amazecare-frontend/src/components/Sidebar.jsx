import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="admin-sidebar shadow-sm">

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link to="/admin" className="nav-link sidebar-link">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/doctors" className="nav-link sidebar-link">
            <i className="bi bi-person-badge-fill me-2"></i>
            Doctors
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/patients" className="nav-link sidebar-link">
            <i className="bi bi-people-fill me-2"></i>
            Patients
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/appointments" className="nav-link sidebar-link">
            <i className="bi bi-calendar-check-fill me-2"></i>
            Appointments
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/medicalrecords" className="nav-link sidebar-link">
            <i className="bi bi-file-medical-fill me-2"></i>
            Medical Records
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/reports" className="nav-link sidebar-link">
            <i className="bi bi-bar-chart-fill me-2"></i>
            Reports
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;