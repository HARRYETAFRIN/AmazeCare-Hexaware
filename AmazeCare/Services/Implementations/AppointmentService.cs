using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Interfaces;
using AutoMapper;

namespace AmazeCare.Services.Implementations
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;
        private readonly IDoctorRepository _doctorRepository;

        public AppointmentService(
            IAppointmentRepository appointmentRepository,IMapper mapper, IDoctorRepository doctorRepository)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
            _doctorRepository = doctorRepository;
        }

        public async Task<string> AddAppointment(AppointmentCreateDTO appointmentDto)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(appointmentDto.DoctorId);

            if (doctor == null)
            {
                return "Doctor Id Not Found";
            }

            var existingAppointment =_appointmentRepository.GetAppointmentByDoctorAndTime(
                    appointmentDto.DoctorId,
                    appointmentDto.AppointmentDate);

            if (existingAppointment != null)
            {
                return "Doctor is already booked for this time slot";
            }

            var appointment =_mapper.Map<Appointment>(appointmentDto);

            appointment.Status = "Pending";

            _appointmentRepository.AddAppointment(appointment);

            _appointmentRepository.SaveChanges();

            return "Appointment Added Successfully";
        }

        public List<AppointmentResponseDTO> GetAppointments()
        {
            var appointments =_appointmentRepository.GetAppointments();

            return _mapper.Map<List<AppointmentResponseDTO>>(appointments);
        }

        public AppointmentResponseDTO? GetAppointmentById(int id)
        {
            var appointment =_appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
            {
                return null;
            }

            return _mapper.Map<AppointmentResponseDTO>(appointment);
        }

        public string UpdateAppointment(int id,AppointmentResponseDTO appointmentDto)
        {
            var appointment =_appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
            {
                return "Appointment Not Found";
            }

            _mapper.Map(appointmentDto, appointment);

            appointment.Status = "Pending";

            _appointmentRepository.SaveChanges();

            return "Appointment Updated Successfully";
        }
        public List<AppointmentResponseDTO>GetAppointmentsByDoctorId(int doctorId)
        {
            var appointments =_appointmentRepository.GetAppointmentsByDoctorId(doctorId);

            return _mapper.Map<List<AppointmentResponseDTO>>(
                appointments);
        }
        public List<AppointmentResponseDTO>
    GetBookedAppointmentsByDoctorId(int doctorId)
        {
            var appointments = _appointmentRepository.GetBookedAppointmentsByDoctorId(doctorId);

            return _mapper.Map<List<AppointmentResponseDTO>>(appointments);
        }

        public string DeleteAppointment(int id)
        {
            var appointment = _appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
            {
                return "Appointment Not Found";
            }

            _appointmentRepository.DeleteAppointment(appointment);

            _appointmentRepository.SaveChanges();

            return "Appointment Deleted Successfully";
        }
    }
}