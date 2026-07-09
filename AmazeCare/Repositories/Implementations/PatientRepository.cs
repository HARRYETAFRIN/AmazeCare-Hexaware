using AmazeCare.Data;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
        public async Task<Patient?> GetPatientByIdAsync(int id)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(
                    p => p.PatientId == id
                );
        }
        public List<Patient> GetPatientsByDoctorId(int doctorId)
        {
            var patientIds = _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Select(a => a.PatientId)
                .Distinct()
                .ToList();

            return _context.Patients
                .Where(p => patientIds.Contains(p.PatientId))
                .ToList();
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