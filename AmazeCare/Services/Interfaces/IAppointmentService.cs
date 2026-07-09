using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<string> AddAppointment(AppointmentCreateDTO appointmentDto);

        List<AppointmentResponseDTO> GetAppointments();

        AppointmentResponseDTO? GetAppointmentById(int id);
        List<AppointmentResponseDTO>GetAppointmentsByDoctorId(int doctorId);
        List<AppointmentResponseDTO>GetBookedAppointmentsByDoctorId(int doctorId);
        List<AppointmentResponseDTO> GetAppointmentsByPatientId(int patientId);

        List<TimeSpan> GetBookedSlots(int doctorId, DateTime date);

        string UpdateAppointment(int id,AppointmentResponseDTO appointmentDto);
        string RescheduleAppointment(int appointmentId,AppointmentRescheduleDTO appointmentDto);
        string CompleteAppointment(int id);

        string CancelAppointment(int id);

        string DeleteAppointment(int id);
    }
}