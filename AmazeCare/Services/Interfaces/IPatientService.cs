using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IPatientService
    {
        string AddPatient(PatientDto patientDto);

        List<PatientDto> GetAllPatients();

        PatientDto GetPatientById(int id);

        string UpdatePatient(int id, PatientDto patientDto);

        string DeletePatient(int id);
    }
}