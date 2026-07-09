namespace AmazeCare.DTO
{
    public class AppointmentCreateDTO
    {
        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public string Symptoms { get; set; } = string.Empty;

        public string VisitType { get; set; } = string.Empty;

        public DateTime AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }



    }
}
