using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Implementations;
using AutoMapper;
using Moq;

namespace AmazeCareProj.Tests.Services
{
    [TestFixture]
    public class AppointmentServiceTests
    {
        private Mock<IAppointmentRepository> _appointmentRepositoryMock;
        private Mock<IDoctorRepository> _doctorRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private AppointmentService _appointmentService;
        private Mock<IPatientRepository> _patientRepositoryMock;
        [SetUp]
        public void Setup()
        {
            _appointmentRepositoryMock =
                new Mock<IAppointmentRepository>();

            _doctorRepositoryMock =
                new Mock<IDoctorRepository>();

            _mapperMock =
                new Mock<IMapper>();

            _appointmentService =
                new AppointmentService(
                    _appointmentRepositoryMock.Object,
                    _mapperMock.Object,
                    _doctorRepositoryMock.Object,
                      _patientRepositoryMock.Object);
        }

        [Test]
        public void GetAppointments_WhenAppointmentsExist_ShouldReturnAppointmentList()
        {
            // Arrange
            var appointments =new List<Appointment>();

            var appointmentDtos = new List<AppointmentResponseDTO>();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointments())
                .Returns(appointments);

            _mapperMock
                .Setup(x => x.Map<List<AppointmentResponseDTO>>(appointments))
                .Returns(appointmentDtos);

            // Act
            var result =_appointmentService.GetAppointments();

            // Assert
            Assert.That(result,
                Is.EqualTo(appointmentDtos));
        }

        [Test]
        public async Task AddAppointment_WhenAppointmentIsValid_ShouldReturnSuccessMessage()
        {
            // Arrange
            var appointmentDto = new AppointmentCreateDTO
            {
                DoctorId = 1
            };

            var appointment = new Appointment();

            var doctor = new Doctor();

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(1))
                .ReturnsAsync(doctor);

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentByDoctorAndTime(
                    appointmentDto.DoctorId,
                    appointmentDto.AppointmentDate,
                    appointmentDto.AppointmentTime))
                .Returns((Appointment)null);

            _mapperMock
                .Setup(x => x.Map<Appointment>(appointmentDto))
                .Returns(appointment);

            // Act
            string result = await _appointmentService.AddAppointment( appointmentDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Appointment Added Successfully"));

            _appointmentRepositoryMock.Verify(
                x => x.AddAppointment(appointment),
                Times.Once);

            _appointmentRepositoryMock.Verify(
                x => x.SaveChanges(),
                Times.Once);
        }

        [Test]
        public async Task AddAppointment_WhenDoctorDoesNotExist_ShouldReturnDoctorNotFound()
        {
            // Arrange
            var appointmentDto = new AppointmentCreateDTO
            {
                DoctorId = 100
            };

            _doctorRepositoryMock
                .Setup(x => x.GetDoctorByIdAsync(100))
                .ReturnsAsync((Doctor)null);

            // Act
            string result = await _appointmentService.AddAppointment(appointmentDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Doctor Id Not Found"));
        }

        [Test]
        public void GetAppointmentById_WhenAppointmentExists_ShouldReturnAppointment()
        {
            // Arrange
            int appointmentId = 1;

            var appointment = new Appointment();

            var appointmentDto = new AppointmentResponseDTO();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentById(appointmentId))
                .Returns(appointment);

            _mapperMock
                .Setup(x => x.Map<AppointmentResponseDTO>(appointment))
                .Returns(appointmentDto);

            // Act
            var result = _appointmentService.GetAppointmentById(appointmentId);

            // Assert
            Assert.That(result,
                Is.EqualTo(appointmentDto));
        }
        [Test]
        public void GetAppointmentsByDoctorId_WhenAppointmentsExist_ShouldReturnAppointmentList()
        {
            // Arrange
            int doctorId = 1;

            var appointments = new List<Appointment>();

            var appointmentDtos = new List<AppointmentResponseDTO>();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentsByDoctorId(doctorId))
                .Returns(appointments);

            _mapperMock
                .Setup(x => x.Map<List<AppointmentResponseDTO>>(appointments))
                .Returns(appointmentDtos);

            // Act
            var result = _appointmentService.GetAppointmentsByDoctorId(doctorId);

            // Assert
            Assert.That( result,
                Is.EqualTo(appointmentDtos));
        }

        [Test]
        public void UpdateAppointment_WhenAppointmentExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int appointmentId = 1;

            var appointment =new Appointment();

            var appointmentDto = new AppointmentResponseDTO();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentById(appointmentId))
                .Returns(appointment);

            // Act
            string result = _appointmentService.UpdateAppointment(appointmentId,appointmentDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Appointment Updated Successfully"));

            _appointmentRepositoryMock.Verify(
                x => x.SaveChanges(),
                Times.Once);
        }

        [Test]
        public void UpdateAppointment_WhenAppointmentDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int appointmentId = 1;

            var appointmentDto =new AppointmentResponseDTO();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentById(appointmentId))
                .Returns((Appointment)null);

            // Act
            string result =_appointmentService.UpdateAppointment(appointmentId,appointmentDto);

            // Assert
            Assert.That(result,Is.EqualTo("Appointment Not Found"));
        }

        [Test]
        public void DeleteAppointment_WhenAppointmentExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int appointmentId = 1;

            var appointment =
                new Appointment();

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentById(appointmentId))
                .Returns(appointment);

            // Act
            string result =_appointmentService.DeleteAppointment( appointmentId);

            // Assert
            Assert.That(result,
                Is.EqualTo("Appointment Deleted Successfully"));

            _appointmentRepositoryMock.Verify(
                x => x.DeleteAppointment(appointment),
                Times.Once);

            _appointmentRepositoryMock.Verify(
                x => x.SaveChanges(),
                Times.Once);
        }

        [Test]
        public void DeleteAppointment_WhenAppointmentDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int appointmentId = 1;

            _appointmentRepositoryMock
                .Setup(x => x.GetAppointmentById(appointmentId))
                .Returns((Appointment)null);

            // Act
            string result =
                _appointmentService.DeleteAppointment(
                    appointmentId);

            // Assert
            Assert.That(result,
                Is.EqualTo("Appointment Not Found"));
        }
    }
}