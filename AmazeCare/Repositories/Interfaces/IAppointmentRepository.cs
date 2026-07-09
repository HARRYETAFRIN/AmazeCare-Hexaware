using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IAppointmentRepository
    {
        void AddAppointment(Appointment appointment);

        List<Appointment> GetAppointments();

        Appointment? GetAppointmentById(int id);
        Appointment? GetAppointmentByDoctorAndTime(int doctorId, DateTime appointmentDate, TimeSpan appointmentTime);
        List<Appointment> GetAppointmentsByDoctorId(int doctorId);
        List<Appointment> GetBookedAppointmentsByDoctorId(int doctorId);
        List<Appointment> GetAppointmentsByPatientId(int patientId);

        List<TimeSpan> GetBookedSlots(int doctorId, DateTime date);
        void UpdateAppointment(Appointment appointment);
        void DeleteAppointment(Appointment appointment);
        void SaveChanges();
    }
}