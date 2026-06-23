using AmazeCare.Data;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Repositories.Implementations
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly AmazeCareDbContext _context;

        public DoctorRepository(AmazeCareDbContext context)
        {
            _context = context;
        }

        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor?> GetDoctorByIdAsync(int id)
        {
            return await _context.Doctors
                .FirstOrDefaultAsync(d => d.DoctorId == id);
        }

        public async Task AddDoctorAsync(Doctor doctor)
        {
            await _context.Doctors.AddAsync(doctor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
        }
    }
}