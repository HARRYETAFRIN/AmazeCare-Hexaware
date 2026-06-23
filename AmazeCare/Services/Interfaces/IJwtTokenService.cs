using AmazeCare.DTO;
using AmazeCare.Models;

namespace AmazeCare.Services.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);
    }
}
