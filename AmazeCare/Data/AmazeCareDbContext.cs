using Microsoft.EntityFrameworkCore;
using AmazeCare.Models;

namespace AmazeCare.Data
{
    public class AmazeCareDbContext : DbContext
    {
        public AmazeCareDbContext(DbContextOptions<AmazeCareDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<MedicalRecord> MedicalRecords { get; set; }
    }
}