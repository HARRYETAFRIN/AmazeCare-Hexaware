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
        public Appointment? GetAppointmentByDoctorAndTime(int doctorId, DateTime appointmentDate, TimeSpan appointmentTime)
        {
            return _context.Appointments
                .FirstOrDefault(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate == appointmentDate &&
                    a.AppointmentTime == appointmentTime);
                    
        }
        public List<Appointment> GetAppointmentsByDoctorId(int doctorId)
        {
            return _context.Appointments
                .Where(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate >= DateTime.Now )
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

        public List<Appointment> GetAppointmentsByPatientId(int patientId)
        {
            return _context.Appointments
                .Where(a => a.PatientId == patientId)
                .ToList();
        }

        public List<TimeSpan> GetBookedSlots(int doctorId, DateTime date)
        {
            return _context.Appointments
                .Where(a =>
                    a.DoctorId == doctorId &&
                    a.AppointmentDate.Date == date.Date)
                .Select(a => a.AppointmentTime)
                .ToList();
        }

        public void UpdateAppointment(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
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