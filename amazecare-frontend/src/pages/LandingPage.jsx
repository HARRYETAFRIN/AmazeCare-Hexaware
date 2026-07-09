import { useNavigate } from "react-router-dom";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <h3 className="text-white fw-bold mb-0">
          🏥 AmazeCare Hospital
        </h3>

        <button
          className="btn btn-light ms-auto"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>

      <div className="container">

        <div className="row align-items-center hero-section">

          <div className="col-md-6">

            <h1 className="display-4 fw-bold">
              Your Health,
              <br />
              Our Priority
            </h1>

            <p className="lead mt-4">
              Book appointments, consult experienced doctors,
              access medical records and manage healthcare
              anytime, anywhere.
            </p>

            <button
              className="btn btn-primary btn-lg mt-3 px-4"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

          </div>

          <div className="col-md-6 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
              alt="Hospital"
              className="hero-image"
            />

          </div>

        </div>

      </div>

      <section className="container mt-5 mb-5">

        <div className="row text-center">

          <div className="col-md-4">

            <div className="card shadow p-4">

              <h3>👨‍⚕️</h3>

              <h5>Expert Doctors</h5>

              <p>
                Consult experienced specialists from
                multiple departments.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow p-4">

              <h3>📅</h3>

              <h5>Easy Appointments</h5>

              <p>
                Book, cancel and reschedule appointments
                within seconds.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow p-4">

              <h3>🩺</h3>

              <h5>Medical Records</h5>

              <p>
                Securely access prescriptions and
                treatment history.
              </p>

            </div>

          </div>

        </div>

      </section>

      <footer className="bg-primary text-white text-center p-3">
        © 2026 AmazeCare Hospital | Healthcare Management System
      </footer>

    </div>
  );
}

export default LandingPage;