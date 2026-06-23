using AmazeCare.Data;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;

namespace AmazeCare.Repositories.Implementations
{
    public class PatientRepository : IPatientRepository
    {
        private readonly AmazeCareDbContext _context;

        public PatientRepository(AmazeCareDbContext context)
        {
            _context = context;
        }

        public void AddPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }

        public List<Patient> GetAllPatients()
        {
            return _context.Patients.ToList();
        }

        public Patient GetPatientById(int id)
        {
            return _context.Patients.FirstOrDefault(p => p.PatientId == id);
        }

        public void UpdatePatient()
        {
            _context.SaveChanges();
        }

        public void DeletePatient(Patient patient)
        {
            _context.Patients.Remove(patient);
            _context.SaveChanges();
        }
    }
}