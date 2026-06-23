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

        string UpdateAppointment(int id,AppointmentResponseDTO appointmentDto);

        string DeleteAppointment(int id);
    }
}