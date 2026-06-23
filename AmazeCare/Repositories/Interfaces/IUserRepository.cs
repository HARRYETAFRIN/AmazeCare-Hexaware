using AmazeCare.DTO;
using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IUserRepository
    {
        string Register(RegisterDto registerDto);

        User? Login(LoginDto loginDto);
    }
}
