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