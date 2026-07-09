import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    try {
      const res = await api.post("/Auth/login", {
        email,
        password,
      });

      const token = res.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      const role =
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      localStorage.setItem("userId", decoded.UserId);
      localStorage.setItem("role", role);

      if (role === "Doctor" && decoded.DoctorId) {
        localStorage.setItem("doctorId", decoded.DoctorId);
      }

      if (role === "Patient" && decoded.PatientId) {
        localStorage.setItem("patientId", decoded.PatientId);
      }

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Doctor") {
        navigate("/doctor");
      } else if (role === "Patient") {
        navigate("/patient");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <div className="text-center mb-4">
            <h1 className="display-6 fw-bold text-primary">
              🏥 AmazeCare
            </h1>

            <p className="text-muted">
              Welcome Back
            </p>
          </div>

          {/* Email */}

          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: "",
              });
            }}
          />

          {errors.email && (
            <small className="text-danger">
              {errors.email}
            </small>
          )}

          <div className="mb-3"></div>

          {/* Password */}

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                ...errors,
                password: "",
              });
            }}
          />

          {errors.password && (
            <small className="text-danger">
              {errors.password}
            </small>
          )}

          <div className="mb-4"></div>

          <button
            className="btn btn-primary w-100 login-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="text-center mt-4">
            <span className="text-muted">
              Don't have an account?
            </span>

            <br />

            <Link
              to="/register"
              className="fw-bold"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;