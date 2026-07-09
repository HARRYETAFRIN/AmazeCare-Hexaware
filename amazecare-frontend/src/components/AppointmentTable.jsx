function AppointmentTable({ appointments }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>{appointment.patientName}</td>
            <td>{appointment.doctorName}</td>
            <td>{appointment.appointmentDate}</td>
            <td>{appointment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;