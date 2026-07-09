import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

function PatientDoctors() {

  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {

      const res = await api.get("/Doctor");

      setDoctors(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const bookAppointment = (doctor) => {

    navigate("/patient/bookappointment", {
      state: doctor,
    });

  };

  return (
    <>
      <PatientNavbar />

      <div className="d-flex">

        <PatientSidebar />

        <div className="container mt-4">

          <h2 className="mb-4">
            Available Doctors
          </h2>

          <div className="row">

            {doctors.map((doctor) => (

              <div
                className="col-md-4 mb-4"
                key={doctor.doctorId}
              >

                <div className="card shadow h-100">

                  <div className="card-body text-center">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                      alt="doctor"
                      width="100"
                    />

                    <h4 className="mt-3">
                      Dr. {doctor.name}
                    </h4>

                    <hr />

                    <p>

                      <strong>
                        Specialization :
                      </strong>

                      <br />

                      {doctor.specialization}

                    </p>

                    <p>

                      <strong>
                        Experience :
                      </strong>

                      <br />

                      {doctor.experience} Years

                    </p>

                    <p>

                      <strong>
                        Qualification :
                      </strong>

                      <br />

                      {doctor.qualification}

                    </p>

                    <p>

                      <strong>
                        Designation :
                      </strong>

                      <br />

                      {doctor.designation}

                    </p>

                    <button
                      className="btn btn-primary mt-2"
                      onClick={() =>
                        bookAppointment(doctor)
                      }
                    >
                      Book Appointment
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>
  );
}

export default PatientDoctors;