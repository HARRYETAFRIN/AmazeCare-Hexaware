using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IPatientRepository
    {
        void AddPatient(Patient patient);

        List<Patient> GetAllPatients();

        Patient GetPatientById(int id);

        void UpdatePatient();

        void DeletePatient(Patient patient);
    }
}