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
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        private readonly IValidator<PatientDto> _validator;

        public PatientController(IPatientService patientService,IValidator<PatientDto> validator)
        {
            _patientService = patientService;
            _validator = validator;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult AddPatient(PatientDto patientDto)
        {
            var validationResult = _validator.Validate(patientDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(new
                {
                    Message = validationResult.Errors
                   .Select(x => x.ErrorMessage)
                });
            }

            return Ok(_patientService.AddPatient(patientDto));
        }
        [Authorize(Roles = "Admin,Doctor")]
        [HttpGet]
        public IActionResult GetAllPatients()
        {
            return Ok(_patientService.GetAllPatients());
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetPatientById(int id)
        {
            var patient = _patientService.GetPatientById(id);

            if (patient == null)
            {
                return NotFound("Patient Not Found");
            }

            return Ok(patient);
        }

        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor/{doctorId}")]
        public IActionResult GetPatientsByDoctorId( int doctorId)
        {
            var patients =
                _patientService
                .GetPatientsByDoctorId(doctorId);

            return Ok(patients);
        }
        [Authorize(Roles = "Admin,Patient")]
        [HttpPut("{id}")]
        public IActionResult UpdatePatient(int id, PatientDto patientDto)
        {
            var result = _patientService.UpdatePatient(id, patientDto);

            if (result == "Patient Not Found")
            {
                return NotFound(result);
            }

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult DeletePatient(int id)
        {
            var result = _patientService.DeletePatient(id);

            if (result == "Patient Not Found")
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}