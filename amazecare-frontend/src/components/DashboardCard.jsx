function DashboardCard({ title, count }) {

  const getIcon = () => {

    switch (title) {

      case "Doctors":
        return "bi-person-badge-fill";

      case "Patients":
        return "bi-people-fill";

      case "Appointments":
        return "bi-calendar-check-fill";

      case "Records":
        return "bi-file-medical-fill";

      default:
        return "bi-grid-fill";
    }
  };

  return (

    <div className="dashboard-card">

      <i
        className={`bi ${getIcon()} dashboard-icon`}
      ></i>

      <h5>{title}</h5>

      <h2>{count}</h2>

    </div>

  );
}

export default DashboardCard;