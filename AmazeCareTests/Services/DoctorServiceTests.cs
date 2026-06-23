using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Implementations;
using AutoMapper;
using Moq;

namespace AmazeCareProj.Tests.Services
{
    [TestFixture]
    public class DoctorServiceTests
    {
        private Mock<IDoctorRepository> _doctorRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private DoctorService _doctorService;

        [SetUp]
        public void Setup()
        {
            _doctorRepositoryMock = new Mock<IDoctorRepository>();
            _mapperMock = new Mock<IMapper>();

            _doctorService = new DoctorService(_doctorRepositoryMock.Object,_mapperMock.Object);
        }

        [Test]
        public async Task GetAllDoctorsAsync_WhenDoctorsExist_ShouldReturnDoctorList()
        {
            // Arrange
            var doctors = new List<Doctor>();

            var doctorDtos = new List<DoctorDto>();

            _doctorRepositoryMock
                .Setup(x => x.GetAllDoctorsAsync())
                .ReturnsAsync(doctors);

            _mapperMock
                .Setup(x => x.Map<List<DoctorDto>>(doctors))
                .Returns(doctorDtos);

            // Act
            var result = await _doctorService.GetAllDoctorsAsync();

            // Assert
            Assert.That(result, Is.EqualTo(doctorDtos));
        }

        [Test]
        public async Task AddDoctorAsync_WhenDoctorIsValid_ShouldReturnSuccessMessage()
        {
            // Arrange
            var doctorCreateDTO = new DoctorCreateDTO();

            var doctor = new Doctor();

            _mapperMock
                .Setup(x => x.Map<Doctor>(doctorCreateDTO))
                .Returns(doctor);

            // Act
            string result =
                await _doctorService.AddDoctorAsync(doctorCreateDTO);

            // Assert
            Assert.That(result,Is.EqualTo("Doctor Added Successfully"));

            _doctorRepositoryMock.Verify(
                x => x.AddDoctorAsync(doctor),
                Times.Once);
        }

        [Test]
        public async Task UpdateDoctorAsync_WhenDoctorExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int doctorId = 1;

            var doctorDto = new DoctorDto();

            var doctor = new Doctor();

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(doctorId))
                .ReturnsAsync(doctor);

            // Act
            string result =
                await _doctorService.UpdateDoctorAsync(doctorId,doctorDto);

            // Assert
            Assert.That(result,Is.EqualTo("Doctor Updated Successfully"));

            _doctorRepositoryMock.Verify(
                x => x.UpdateDoctorAsync(doctor),
                Times.Once);
        }

        [Test]
        public async Task UpdateDoctorAsync_WhenDoctorDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int doctorId = 1;

            var doctorDto = new DoctorDto();

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(doctorId))
                .ReturnsAsync((Doctor)null);

            // Act
            string result = await _doctorService.UpdateDoctorAsync(doctorId,doctorDto);

            // Assert
            Assert.That(result,Is.EqualTo("Doctor Not Found"));
        }

        [Test]
        public async Task DeleteDoctorAsync_WhenDoctorExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int doctorId = 1;

            var doctor = new Doctor();

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(doctorId))
                .ReturnsAsync(doctor);

            // Act
            string result =await _doctorService.DeleteDoctorAsync(doctorId);

            // Assert
            Assert.That(result,Is.EqualTo("Doctor Deleted Successfully"));

            _doctorRepositoryMock.Verify(
                x => x.DeleteDoctorAsync(doctor),
                Times.Once);
        }

        [Test]
        public async Task DeleteDoctorAsync_WhenDoctorDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int doctorId = 1;

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(doctorId))
                .ReturnsAsync((Doctor)null);

            // Act
            string result =await _doctorService.DeleteDoctorAsync(doctorId);

            // Assert
            Assert.That(result,Is.EqualTo("Doctor Not Found"));
        }
    }
}