using AmazeCare.DTO;
using FluentValidation;

namespace AmazeCare.Validators
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
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
         .Must(x => x.ToLower() != "string")
         .WithMessage("Please enter a valid password.");
        }
    }
}