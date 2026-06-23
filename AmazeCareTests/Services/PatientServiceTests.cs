using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Implementations;
using AutoMapper;
using Moq;

namespace AmazeCareProj.Tests.Services
{
    [TestFixture]
    public class PatientServiceTests
    {
        private Mock<IPatientRepository> _patientRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private PatientService _patientService;


    [SetUp]
        public void Setup()
        {
            _patientRepositoryMock = new Mock<IPatientRepository>();
            _mapperMock = new Mock<IMapper>();

            _patientService = new PatientService(
                _patientRepositoryMock.Object,
                _mapperMock.Object);
        }

        [Test]
        public void GetAllPatients_WhenPatientsExist_ShouldReturnPatientList()
        {
            // Arrange
            var patients = new List<Patient>();

            var patientDtos = new List<PatientDto>();

            _patientRepositoryMock
                .Setup(x => x.GetAllPatients())
                .Returns(patients);

            _mapperMock
                .Setup(x => x.Map<List<PatientDto>>(patients))
                .Returns(patientDtos);

            // Act
            var result = _patientService.GetAllPatients();

            // Assert
            Assert.That(result, Is.EqualTo(patientDtos));
        }

        [Test]
        public void AddPatient_WhenPatientIsValid_ShouldReturnSuccessMessage()
        {
            // Arrange
            var patientDto = new PatientDto();

            var patient = new Patient();

            _mapperMock
                .Setup(x => x.Map<Patient>(patientDto))
                .Returns(patient);

            // Act
            string result = _patientService.AddPatient(patientDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Patient Added Successfully"));

            _patientRepositoryMock.Verify(
                x => x.AddPatient(patient),
                Times.Once);
        }

        [Test]
        public void GetPatientById_WhenPatientExists_ShouldReturnPatient()
        {
            // Arrange
            int patientId = 1;

            var patient = new Patient();

            var patientDto = new PatientDto();

            _patientRepositoryMock
                .Setup(x => x.GetPatientById(patientId))
                .Returns(patient);

            _mapperMock
                .Setup(x => x.Map<PatientDto>(patient))
                .Returns(patientDto);

            // Act
            var result = _patientService.GetPatientById(patientId);

            // Assert
            Assert.That(result, Is.EqualTo(patientDto));
        }

        [Test]
        public void UpdatePatient_WhenPatientExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int patientId = 1;

            var patient = new Patient();

            var patientDto = new PatientDto();

            _patientRepositoryMock
                .Setup(x => x.GetPatientById(patientId))
                .Returns(patient);

            // Act
            string result =
                _patientService.UpdatePatient(
                    patientId,
                    patientDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Patient Updated Successfully"));

            _patientRepositoryMock.Verify(
                x => x.UpdatePatient(),
                Times.Once);
        }

        [Test]
        public void UpdatePatient_WhenPatientDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int patientId = 1;

            var patientDto = new PatientDto();

            _patientRepositoryMock
                .Setup(x => x.GetPatientById(patientId))
                .Returns((Patient)null);

            // Act
            string result =
                _patientService.UpdatePatient(
                    patientId,
                    patientDto);

            // Assert
            Assert.That(result,Is.EqualTo("Patient Not Found"));
        }

        [Test]
        public void DeletePatient_WhenPatientExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int patientId = 1;

            var patient = new Patient();

            _patientRepositoryMock
                .Setup(x => x.GetPatientById(patientId))
                .Returns(patient);

            // Act
            string result =
                _patientService.DeletePatient(patientId);

            // Assert
            Assert.That(result,
                Is.EqualTo("Patient Deleted Successfully"));

            _patientRepositoryMock.Verify(
                x => x.DeletePatient(patient),
                Times.Once);
        }

        [Test]
        public void DeletePatient_WhenPatientDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int patientId = 1;

            _patientRepositoryMock
                .Setup(x => x.GetPatientById(patientId))
                .Returns((Patient)null);

            // Act
            string result =
                _patientService.DeletePatient(patientId);

            // Assert
            Assert.That(result,
                Is.EqualTo("Patient Not Found"));
        }
    }

}
