using AmazeCare.Data;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;

namespace AmazeCare.Repositories.Implementations
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AmazeCareDbContext _context;

        public AppointmentRepository(AmazeCareDbContext context)
        {
            _context = context;
        }

        public void AddAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
        }

        public List<Appointment> GetAppointments()
        {
            return _context.Appointments.ToList();
        }

        public Appointment? GetAppointmentById(int id)
        {
            return _context.Appointments
                .FirstOrDefault(a => a.AppointmentId == id);
        }
        public Appointment? GetAppointmentByDoctorAndTime(int doctorId, DateTime appointmentDate)
        {
            return _context.Appointments
                .FirstOrDefault(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate == appointmentDate);
        }
        public List<Appointment> GetAppointmentsByDoctorId(int doctorId)
        {
            return _context.Appointments
                .Where(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate >= DateTime.Now)
                .OrderBy(a => a.AppointmentDate)
                .ToList();
        }
        public List<Appointment> GetBookedAppointmentsByDoctorId(int doctorId)
        {
            return _context.Appointments
                .Where(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate >= DateTime.Now)
                .OrderBy(a => a.AppointmentDate)
                .ToList();
        }

        public void DeleteAppointment(Appointment appointment)
        {
            _context.Appointments.Remove(appointment);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}