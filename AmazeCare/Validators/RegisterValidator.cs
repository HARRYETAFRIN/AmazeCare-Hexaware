using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required.")
                .Length(3, 50)
                .WithMessage("Name must be between 3 and 50 characters.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid name.");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .EmailAddress()
                .WithMessage("Invalid Email Address.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid email.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password is required.")
                .MinimumLength(6)
                .WithMessage("Password must contain at least 6 characters.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid password.");

            RuleFor(x => x.Role)
                .NotEmpty()
                .WithMessage("Role is required.")
                .Must(x => x.ToLower() != "string")
                .WithMessage("Please enter a valid role.");
        }
    }
}