using AmazeCare.DTO;
using AmazeCare.Services.Implementations;
using AmazeCare.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;
        private readonly IValidator<AppointmentCreateDTO> _validator;
        private readonly IDoctorService _doctorService;

        public AppointmentController
        (
            IAppointmentService appointmentService,
            IValidator<AppointmentCreateDTO> validator,
            IDoctorService doctorService
            
        )
        {
            _appointmentService = appointmentService;
            _validator = validator;
            _doctorService = doctorService;
            
        }
        [Authorize(Roles = "Patient,Admin")]
        [HttpPost]
        public async Task<IActionResult> AddAppointment(AppointmentCreateDTO appointmentDto)
        {
            var validationResult = _validator.Validate(appointmentDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(new
                {
                    Message = validationResult.Errors
                        .Select(x => x.ErrorMessage)
                });
            }

            var result =await _appointmentService.AddAppointment( appointmentDto);

            return Ok(result);
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetAppointments()
        {
            return Ok(_appointmentService.GetAppointments());
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetAppointmentById(int id)
        {
            var appointment = _appointmentService.GetAppointmentById(id);

            if (appointment == null)
            {
                return NotFound("Appointment Not Found");
            }

            return Ok(appointment);
        }
        [Authorize(Roles = "Doctor,Admin")]
        [HttpGet("doctor/{doctorId}")]
        public IActionResult GetAppointmentsByDoctorId( int doctorId)
        {
            var appointments =_appointmentService.GetAppointmentsByDoctorId(doctorId);
            if(!appointments.Any())
            {
                return NotFound("No upcoming appointments found");
            }
            return Ok(appointments);
        }
        [Authorize(Roles = "Patient,Admin")]
        [HttpGet("bookedSlots/{doctorId}")]
        public async Task<IActionResult> GetBookedAppointmentsByDoctorId( int doctorId)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(doctorId);

            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }
            var appointments =_appointmentService.GetBookedAppointmentsByDoctorId(doctorId);

            if (!appointments.Any())
            {
                return NotFound("No booked appointments found");
            }

            return Ok(appointments);
        }
        [Authorize(Roles = "Admin,Doctor")]
        [HttpPut("{id}")]
        public IActionResult UpdateAppointment(int id, AppointmentResponseDTO appointmentDto)
        {
            return Ok(_appointmentService.UpdateAppointment(id, appointmentDto));
        }
        [Authorize(Roles = "Admin,Doctor")]
        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            return Ok(_appointmentService.DeleteAppointment(id));
        }
    }
}
