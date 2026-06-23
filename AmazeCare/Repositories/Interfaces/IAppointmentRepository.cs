using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IAppointmentRepository
    {
        void AddAppointment(Appointment appointment);

        List<Appointment> GetAppointments();

        Appointment? GetAppointmentById(int id);
        Appointment? GetAppointmentByDoctorAndTime(int doctorId, DateTime appointmentDate);
        List<Appointment> GetAppointmentsByDoctorId(int doctorId);
        List<Appointment> GetBookedAppointmentsByDoctorId(int doctorId);

        void SaveChanges();

        void DeleteAppointment(Appointment appointment);
    }
}