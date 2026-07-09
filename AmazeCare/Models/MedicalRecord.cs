namespace AmazeCare.Models
{
    public class MedicalRecord
    {
        public int MedicalRecordId { get; set; }

        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
        public string Diagnosis { get; set; } = string.Empty;

        public string TreatmentPlan { get; set; } = string.Empty;

        public string Prescription { get; set; } = string.Empty;

        public string RecommendedTests { get; set; } = string.Empty;
    }
}
