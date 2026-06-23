using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Interfaces;
using AutoMapper;

namespace AmazeCare.Services.Implementations
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;

        public DoctorService(IDoctorRepository doctorRepository, IMapper mapper)
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<List<DoctorDto>> GetAllDoctorsAsync()
        {
            var doctors = await _doctorRepository.GetAllDoctorsAsync();

            return _mapper.Map<List<DoctorDto>>(doctors);
        }

        public async Task<DoctorDto?> GetDoctorByIdAsync(int id)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);

            if (doctor == null)
            {
                return null;
            }

            return _mapper.Map<DoctorDto>(doctor);
        }

        public async Task<string> AddDoctorAsync(DoctorCreateDTO doctorDto)
        {
            var doctor = _mapper.Map<Doctor>(doctorDto);

            await _doctorRepository.AddDoctorAsync(doctor);

            return "Doctor Added Successfully";
        }

        public async Task<string> UpdateDoctorAsync(int id, DoctorDto doctorDto)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);

            if (doctor == null)
            {
                return "Doctor Not Found";
            }

            _mapper.Map(doctorDto, doctor);

            await _doctorRepository.UpdateDoctorAsync(doctor);

            return "Doctor Updated Successfully";
        }

        public async Task<string> DeleteDoctorAsync(int id)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);

            if (doctor == null)
            {
                return "Doctor Not Found";
            }

            await _doctorRepository.DeleteDoctorAsync(doctor);

            return "Doctor Deleted Successfully";
        }
    }
}

