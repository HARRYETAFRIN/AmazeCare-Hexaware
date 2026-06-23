using AmazeCare.DTO;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Interfaces;

namespace AmazeCare.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(IUserRepository userRepository,IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
        }

        public string Register(RegisterDto registerDto)
        {
            return _userRepository.Register(registerDto);
        }

        public string Login(LoginDto loginDto)
        {
            var user = _userRepository.Login(loginDto);

            if (user == null)
            {
                return "Invalid Email or Password";
            }

            return _jwtTokenService.GenerateToken(user);
        }
    }
}
