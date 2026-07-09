using AmazeCare.Data;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;

namespace AmazeCare.Repositories.Implementations
{
    public class MedicalRecordRepository : IMedicalRecordRepository
    {
        private readonly AmazeCareDbContext _context;

        public MedicalRecordRepository(AmazeCareDbContext context)
        {
            _context = context;
        }

        public void AddMedicalRecord(MedicalRecord medicalRecord)
        {
            _context.MedicalRecords.Add(medicalRecord);
            _context.SaveChanges();
        }

        public List<MedicalRecord> GetAllMedicalRecords()
        {
            return _context.MedicalRecords.ToList();
        }

        public MedicalRecord GetMedicalRecordById(int id)
        {
            return _context.MedicalRecords.FirstOrDefault(x => x.MedicalRecordId == id);
        }

        public List<MedicalRecord> GetMedicalRecordsByDoctorId(int doctorId)
        {
            var appointmentIds = _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Select(a => a.AppointmentId)
                .ToList();

            return _context.MedicalRecords
                .Where(m => appointmentIds.Contains(m.AppointmentId))
                .ToList();
        }

        public List<MedicalRecord> GetMedicalRecordsByPatientId(int patientId)
        {
            var appointmentIds = _context.Appointments
                .Where(a => a.PatientId == patientId)
                .Select(a => a.AppointmentId)
                .ToList();

            return _context.MedicalRecords
                .Where(m => appointmentIds.Contains(m.AppointmentId))
                .ToList();
        }
        public MedicalRecord GetMedicalRecordByAppointmentId(int appointmentId)
        {
            return _context.MedicalRecords
                .FirstOrDefault(x => x.AppointmentId == appointmentId);
        }
        public void UpdateMedicalRecord()
        {
            _context.SaveChanges();
        }

        public void DeleteMedicalRecord(MedicalRecord medicalRecord)
        {
            _context.MedicalRecords.Remove(medicalRecord);
            _context.SaveChanges();
        }
    }
}