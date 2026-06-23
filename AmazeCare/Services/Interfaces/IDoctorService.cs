using AmazeCare.DTO;

namespace AmazeCare.Services.Interfaces
{
    public interface IDoctorService
    {
        Task<List<DoctorDto>> GetAllDoctorsAsync();

        Task<DoctorDto?> GetDoctorByIdAsync(int id);

        Task<string> AddDoctorAsync(DoctorCreateDTO doctorDto);

        Task<string> UpdateDoctorAsync(int id, DoctorDto doctorDto);

        Task<string> DeleteDoctorAsync(int id);
    }
}