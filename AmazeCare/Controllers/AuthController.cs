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

            if (result == "Doctor ID Not Found")
            {
                return NotFound(result);
            }

            if (result == "Patient ID Not Found")
            {
                return NotFound(result);
            }

            if (result == "Doctor ID is required")
            {
                return BadRequest(result);
            }

            if (result == "Patient ID is required")
            {
                return BadRequest(result);
            }

            if (result == "Email already exists")
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var token = _authService.Login(loginDto);

            if (token == "Invalid Email or Password")
            {
                return Unauthorized(token);
            }

            return Ok(token);
        }
    }
}