import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">
      <h4 className="text-white m-0">
        AmazeCare Admin Portal
      </h4>

      <button
        className="btn btn-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;