using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IAuthService
    {
        string Register(RegisterDto registerDto);

        string Login(LoginDto loginDto);
    }
}
