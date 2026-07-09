using AmazeCare.Data;
using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AutoMapper;

namespace AmazeCare.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AmazeCareDbContext _context;
        private readonly IMapper _mapper;

        public UserRepository(AmazeCareDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public string Register(RegisterDto registerDto)
        {
            // Check if email already exists
            if (_context.Users.Any(u => u.Email == registerDto.Email))
            {
                return "Email already exists";
            }

            // Validate Doctor Id
            if (registerDto.Role == "Doctor")
            {
                if (registerDto.DoctorId == null)
                {
                    return "Doctor ID is required";
                }

                var doctorExists = _context.Doctors
                    .Any(d => d.DoctorId == registerDto.DoctorId);

                if (!doctorExists)
                {
                    return "Doctor ID Not Found";
                }
            }

            // Validate Patient Id
            if (registerDto.Role == "Patient")
            {
                if (registerDto.PatientId == null)
                {
                    return "Patient ID is required";
                }

                var patientExists = _context.Patients
                    .Any(p => p.PatientId == registerDto.PatientId);

                if (!patientExists)
                {
                    return "Patient ID Not Found";
                }
            }

            var user = _mapper.Map<User>(registerDto);

            user.Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            // Keep only the correct ID
            if (registerDto.Role == "Doctor")
                user.PatientId = null;

            if (registerDto.Role == "Patient")
                user.DoctorId = null;

            if (registerDto.Role == "Admin")
            {
                user.DoctorId = null;
                user.PatientId = null;
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return "User Registered Successfully";
        }

        public User? Login(LoginDto loginDto)
        {
            var user = _context.Users
                .FirstOrDefault(x => x.Email == loginDto.Email);

            if (user == null)
                return null;

            bool isValidPassword =
                BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);

            if (!isValidPassword)
                return null;

            return user;
        }
    }
}