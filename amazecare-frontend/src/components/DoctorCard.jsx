function DoctorCard({ doctor }) {
  return (
    <div>
      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <p>{doctor.experience} Years</p>
    </div>
  );
}

export default DoctorCard;