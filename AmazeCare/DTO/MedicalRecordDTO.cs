namespace AmazeCare.DTO
{
    public class MedicalRecordDto
    {
        public int MedicalRecordId { get; set; }

        public int AppointmentId { get; set; }

        public string Diagnosis { get; set; } = string.Empty;

        public string TreatmentPlan { get; set; } = string.Empty;

        public string Prescription { get; set; } = string.Empty;

        public string RecommendedTests { get; set; } = string.Empty;
    }
}