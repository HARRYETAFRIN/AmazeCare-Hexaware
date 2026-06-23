using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class PatientValidator : AbstractValidator<PatientDto>
    {
        public PatientValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Patient Name is required.")
                .Length(3, 50)
                .WithMessage("Patient Name must be between 3 and 50 characters.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid patient name.");

            RuleFor(x => x.MobileNumber)
                .NotEmpty()
                .WithMessage("Mobile Number is required.")
                .Matches(@"^[6-9]\d{9}$")
                .WithMessage("Mobile Number must be a valid 10 digit Indian mobile number.");

            RuleFor(x => x.Gender)
                .NotEmpty()
                .WithMessage("Gender is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid gender.");

            RuleFor(x => x.DateOfBirth)
                .LessThan(DateTime.Today)
                .WithMessage("Date of Birth must be in the past.");
        }
    }
}
