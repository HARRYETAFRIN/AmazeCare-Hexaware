using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IMedicalRecordRepository
    {
        void AddMedicalRecord(MedicalRecord medicalRecord);

        List<MedicalRecord> GetAllMedicalRecords();

        MedicalRecord GetMedicalRecordById(int id);

        void UpdateMedicalRecord();

        void DeleteMedicalRecord(MedicalRecord medicalRecord);
    }
}