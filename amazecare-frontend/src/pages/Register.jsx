import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    doctorId: "",
    patientId: "",
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      doctorId:
        user.role === "Doctor"
          ? Number(user.doctorId)
          : null,
      patientId:
        user.role === "Patient"
          ? Number(user.patientId)
          : null,
    };

    try {
      const res = await api.post(
        "/Auth/register",
        registerData
      );

      alert(res.data);
      navigate("/login");
      setUser({
        name: "",
        email: "",
        password: "",
        role: "",
        doctorId: "",
        patientId: "",
      });
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data);
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div className="login-page">

      <div className="login-overlay">

        <div className="register-card">

          <div className="text-center mb-4">

            <h1 className="display-6 fw-bold text-primary">
              🏥 AmazeCare
            </h1>

            <p className="text-muted">
              Create Your Account
            </p>

          </div>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />

            <select
              className="form-control mb-3"
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>

            {user.role === "Doctor" && (
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Doctor ID"
                name="doctorId"
                value={user.doctorId}
                onChange={handleChange}
                required
              />
            )}

            {user.role === "Patient" && (
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Patient ID"
                name="patientId"
                value={user.patientId}
                onChange={handleChange}
                required
              />
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
            >
              Register
            </button>

            <div className="text-center mt-4">

              <span className="text-muted">
                Already have an account?
              </span>

              <br />

              <Link
                to="/login"
                className="fw-bold"
              >
                Login Here
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;