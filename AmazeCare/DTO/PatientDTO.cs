namespace AmazeCare.DTO
{
    public class PatientDto
    {
        public int PatientId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; } = string.Empty;

        public string MobileNumber { get; set; } = string.Empty;
    }
}