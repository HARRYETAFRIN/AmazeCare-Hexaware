namespace AmazeCare.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public string Symptoms { get; set; } = string.Empty;

        public string VisitType { get; set; } = string.Empty;

        public DateTime AppointmentDate { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}