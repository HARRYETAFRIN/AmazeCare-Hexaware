using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IMedicalRecordService
    {
        string AddMedicalRecord(MedicalRecordDto medicalRecordDto);

        List<MedicalRecordDto> GetAllMedicalRecords();

        MedicalRecordDto GetMedicalRecordById(int id);

        string UpdateMedicalRecord(int id, MedicalRecordDto medicalRecordDto);

        string DeleteMedicalRecord(int id);
    }
}