using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class DoctorValidator : AbstractValidator<DoctorDto>
    {
        public DoctorValidator()
        {
            RuleFor(x => x.Name)
     .NotEmpty().WithMessage("Doctor Name is required.")
     .Length(3, 50).WithMessage("Doctor Name must be between 3 and 50 characters.")
     .Must(x => x.ToLower() != "string")
     .WithMessage("Please enter a valid doctor name.");

            RuleFor(x => x.Specialization)
                .NotEmpty().WithMessage("Specialization is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid specialization.");

            RuleFor(x => x.Experience)
                .InclusiveBetween(1, 50)
                .WithMessage("Experience must be between 1 and 50 years.");

            RuleFor(x => x.Qualification)
                .NotEmpty().WithMessage("Qualification is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid qualification.");

            RuleFor(x => x.Designation)
                .NotEmpty().WithMessage("Designation is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid designation.");
        }
    }
}