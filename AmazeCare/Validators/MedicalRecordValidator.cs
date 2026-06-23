using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class MedicalRecordValidator : AbstractValidator<MedicalRecordDto>
    {
        public MedicalRecordValidator()
        {
            RuleFor(x => x.AppointmentId)
                .GreaterThan(0)
                .WithMessage("Appointment Id is required.");

            RuleFor(x => x.Diagnosis)
                .NotEmpty()
                .WithMessage("Diagnosis is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid diagnosis.");

            RuleFor(x => x.TreatmentPlan)
                .NotEmpty()
                .WithMessage("Treatment Plan is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid treatment plan.");

            RuleFor(x => x.Prescription)
                .NotEmpty()
                .WithMessage("Prescription is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid prescription.");
        }
    }
}