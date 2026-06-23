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
            var user = _mapper.Map<User>(registerDto);

            user.Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

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

            bool isValidPassword =BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);

            if (!isValidPassword)
                return null;

            return user;
        }
    }
}
