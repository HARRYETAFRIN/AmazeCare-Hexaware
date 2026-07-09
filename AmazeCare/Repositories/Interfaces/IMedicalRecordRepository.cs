using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IMedicalRecordRepository
    {
        void AddMedicalRecord(MedicalRecord medicalRecord);

        List<MedicalRecord> GetAllMedicalRecords();

        MedicalRecord GetMedicalRecordById(int id);
        List<MedicalRecord> GetMedicalRecordsByDoctorId(int doctorId);
        List<MedicalRecord> GetMedicalRecordsByPatientId(int patientId);
        MedicalRecord GetMedicalRecordByAppointmentId(int appointmentId);
        void UpdateMedicalRecord();

        void DeleteMedicalRecord(MedicalRecord medicalRecord);
    }
}