using AmazeCare.DTO;
using AmazeCare.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AmazeCare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto registerDto)
        {
            var result = _authService.Register(registerDto);

            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var token = _authService.Login(loginDto);

            return Ok(token);
        }
    }
}