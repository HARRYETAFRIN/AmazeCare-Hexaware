using AmazeCare.Models;

namespace AmazeCare.Repositories.Interfaces
{
    public interface IDoctorRepository
    {
        Task<List<Doctor>> GetAllDoctorsAsync();

        Task<Doctor?> GetDoctorByIdAsync(int id);

        Task AddDoctorAsync(Doctor doctor);

        Task UpdateDoctorAsync(Doctor doctor);

        Task DeleteDoctorAsync(Doctor doctor);
    }
}