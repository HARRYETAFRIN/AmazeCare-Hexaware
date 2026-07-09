using AmazeCare.DTO;
using AmazeCare.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IValidator<DoctorCreateDTO> _validator;

        public DoctorController(IDoctorService doctorService, IValidator<DoctorCreateDTO> validator)
        {
            _doctorService = doctorService;
            _validator = validator;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            
            var doctors = await _doctorService.GetAllDoctorsAsync();
            return Ok(doctors);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(id);

            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddDoctor(DoctorCreateDTO doctorDto)
        {
            var validationResult = _validator.Validate(doctorDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors
                    .Select(x => x.ErrorMessage));
            }

            var result = await _doctorService.AddDoctorAsync(doctorDto);

            return Ok(result);
        }
        [Authorize(Roles = "Admin,Doctor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, DoctorDto doctorDto)
        {
            var result = await _doctorService.UpdateDoctorAsync(id, doctorDto);

            return Ok(result);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var result = await _doctorService.DeleteDoctorAsync(id);

            return Ok(result);
        }
    }
}