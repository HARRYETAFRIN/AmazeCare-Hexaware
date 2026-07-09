namespace AmazeCare.Models
{
    public class Patient
    {
        public int PatientId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; } 

        public string Gender { get; set; } = string.Empty;

        public string MobileNumber { get; set; } = string.Empty;

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}