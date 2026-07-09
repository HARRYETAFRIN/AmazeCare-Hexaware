using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class AppointmentValidator : AbstractValidator<AppointmentCreateDTO>
    {
        public AppointmentValidator()

        {
            RuleFor(x => x.PatientId)
                .GreaterThan(0)
                .WithMessage("Patient Id must be greater than 0.");

            RuleFor(x => x.DoctorId)
                .GreaterThan(0)
                .WithMessage("Doctor Id must be greater than 0.");

            RuleFor(x => x.Symptoms)
                .NotEmpty()
                .WithMessage("Symptoms are required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter valid symptoms.");

            RuleFor(x => x.VisitType)
                .NotEmpty()
                .WithMessage("Visit Type is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid visit type.");
            RuleFor(x => x.AppointmentDate.Date)
                 .GreaterThan(DateTime.Today)
                 .WithMessage("Appointment Date must be in the future.");
        }
    }
}