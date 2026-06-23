using AmazeCare.DTO;
using AmazeCare.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController : ControllerBase
    {
        private readonly IMedicalRecordService _medicalRecordService;
        private readonly IValidator<MedicalRecordDto> _validator;

        public MedicalRecordController
        (
            IMedicalRecordService medicalRecordService,
            IValidator<MedicalRecordDto> validator
        )
        {
            _medicalRecordService = medicalRecordService;
            _validator = validator;
        }
        [Authorize(Roles = "Doctor")]
        [HttpPost]
        public IActionResult AddMedicalRecord(MedicalRecordDto medicalRecordDto)
        {
            var validationResult = _validator.Validate(medicalRecordDto);

            if (!validationResult.IsValid)
            {
                return BadRequest(new
                {
                    Message = validationResult.Errors
                    .Select(x => x.ErrorMessage)
                });
            }

            return Ok(_medicalRecordService.AddMedicalRecord(medicalRecordDto));
        }
        [Authorize(Roles = "Doctor,Admin")]
        [HttpGet]
        public IActionResult GetAllMedicalRecords()
        {
            return Ok(_medicalRecordService.GetAllMedicalRecords());
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetMedicalRecordById(int id)
        {
            var medicalRecord = _medicalRecordService.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return NotFound();
            }

            return Ok(medicalRecord);
        }
        [Authorize(Roles = "Doctor")]
        [HttpPut("{id}")]
        public IActionResult UpdateMedicalRecord(int id, MedicalRecordDto medicalRecordDto)
        {
            return Ok(_medicalRecordService.UpdateMedicalRecord(id, medicalRecordDto));
        }
        [Authorize(Roles = "Admin,Doctor")]
        [HttpDelete("{id}")]
        public IActionResult DeleteMedicalRecord(int id)
        {
            return Ok(_medicalRecordService.DeleteMedicalRecord(id));
        }
    }
}