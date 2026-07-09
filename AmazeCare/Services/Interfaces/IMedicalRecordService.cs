using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IMedicalRecordService
    {
        string AddMedicalRecord(MedicalRecordDto medicalRecordDto);

        List<MedicalRecordDto> GetAllMedicalRecords();

        MedicalRecordDto GetMedicalRecordById(int id);

        List<MedicalRecordDto> GetMedicalRecordsByDoctorId(int doctorId);

        List<MedicalRecordDto> GetMedicalRecordsByPatientId(int patientId);

        MedicalRecordDto GetMedicalRecordByAppointmentId(int appointmentId);

        string UpdateMedicalRecord(int id, MedicalRecordDto medicalRecordDto);

        string DeleteMedicalRecord(int id);
    }
}