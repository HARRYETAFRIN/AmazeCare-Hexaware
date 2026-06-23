using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class DoctorCreateValidator : AbstractValidator<DoctorCreateDTO>
    {
        public DoctorCreateValidator()
        {
            RuleFor(x => x.Name)
    .NotEmpty().WithMessage("Doctor Name is required")
    .Must(x => x.ToLower() != "string")
    .WithMessage("Please enter a valid doctor name");

            RuleFor(x => x.Specialization)
                .NotEmpty().WithMessage("Specialization is required")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid specialization");

            RuleFor(x => x.Experience)
                .GreaterThan(0)
                .WithMessage("Experience must be greater than 0");

            RuleFor(x => x.Qualification)
                .NotEmpty().WithMessage("Qualification is required")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid qualification");

            RuleFor(x => x.Designation)
                .NotEmpty().WithMessage("Designation is required")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid designation");
        }
    }
}