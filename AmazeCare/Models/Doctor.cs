namespace AmazeCare.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Specialization { get; set; } = string.Empty;

        public int Experience { get; set; }

        public string Qualification { get; set; } = string.Empty;

        public string Designation { get; set; } = string.Empty;

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}