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
        private readonly IPatientRepository _patientRepository;

        public AppointmentService(
            IAppointmentRepository appointmentRepository,IMapper mapper, IDoctorRepository doctorRepository, IPatientRepository patientRepository)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
            _doctorRepository = doctorRepository;
            _patientRepository = patientRepository;
        }

        public async Task<string> AddAppointment(AppointmentCreateDTO appointmentDto)
        {
            // Check whether patient exists
            var patient = await _patientRepository
                .GetPatientByIdAsync(appointmentDto.PatientId);

            if (patient == null)
            {
                return "Patient Id Not Found";
            }

            // Check whether doctor exists
            var doctor = await _doctorRepository
                .GetDoctorByIdAsync(appointmentDto.DoctorId);

            if (doctor == null)
            {
                return "Doctor Id Not Found";
            }

            // Check whether doctor is already booked
            var existingAppointment =
                _appointmentRepository.GetAppointmentByDoctorAndTime(
                    appointmentDto.DoctorId,
                    appointmentDto.AppointmentDate,
                     appointmentDto.AppointmentTime);

            if (existingAppointment != null)
            {
                return "Doctor is already booked for this time slot";
            }

            // Create appointment
            var appointment = _mapper.Map<Appointment>(appointmentDto);

            appointment.Status = "Booked";

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

           
           _appointmentRepository.SaveChanges();

            return "Appointment Updated Successfully";
        }
        public List<AppointmentResponseDTO>GetAppointmentsByDoctorId(int doctorId)
        {
            var appointments =_appointmentRepository.GetAppointmentsByDoctorId(doctorId);

            return _mapper.Map<List<AppointmentResponseDTO>>(
                appointments);
        }
        public List<AppointmentResponseDTO> GetBookedAppointmentsByDoctorId(int doctorId)
        {
            var appointments = _appointmentRepository.GetBookedAppointmentsByDoctorId(doctorId);

            return _mapper.Map<List<AppointmentResponseDTO>>(appointments);
        }

        public List<AppointmentResponseDTO> GetAppointmentsByPatientId(int patientId)
        {
            var appointments =
                _appointmentRepository.GetAppointmentsByPatientId(patientId);

            return _mapper.Map<List<AppointmentResponseDTO>>(appointments);
        }

        public List<TimeSpan> GetBookedSlots(int doctorId, DateTime date)
        {
            return _appointmentRepository.GetBookedSlots(doctorId, date);
        }

        public string RescheduleAppointment(
    int appointmentId,
    AppointmentRescheduleDTO appointmentDto)
        {
            var appointment =
                _appointmentRepository.GetAppointmentById(appointmentId);

            if (appointment == null)
            {
                return "Appointment Not Found";
            }

            // Check if another appointment already exists
            var existingAppointment =
                _appointmentRepository.GetAppointmentByDoctorAndTime(
                    appointment.DoctorId,
                    appointmentDto.AppointmentDate,
                    appointmentDto.AppointmentTime);

            if (existingAppointment != null &&
                existingAppointment.AppointmentId != appointmentId)
            {
                return "Selected time slot is already booked";
            }

            appointment.AppointmentDate = appointmentDto.AppointmentDate;
            appointment.AppointmentTime = appointmentDto.AppointmentTime;

            _appointmentRepository.UpdateAppointment(appointment);
            _appointmentRepository.SaveChanges();

            return "Appointment Rescheduled Successfully";
        }

        public string CompleteAppointment(int id)
        {
            var appointment = _appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
                return "Appointment Not Found";

            appointment.Status = "Completed";

            _appointmentRepository.SaveChanges();

            return "Appointment Completed Successfully";
        }

        public string CancelAppointment(int id)
        {
            var appointment = _appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
                return "Appointment Not Found";

            appointment.Status = "Cancelled";

            _appointmentRepository.SaveChanges();

            return "Appointment Cancelled Successfully";
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