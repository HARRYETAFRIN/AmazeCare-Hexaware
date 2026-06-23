using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Implementations;
using AutoMapper;
using Moq;

namespace AmazeCareProj.Tests.Services
{
    [TestFixture]
    public class MedicalRecordServiceTests
    {
        private Mock<IMedicalRecordRepository> _medicalRecordRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private MedicalRecordService _medicalRecordService;


    [SetUp]
        public void Setup()
        {
            _medicalRecordRepositoryMock =new Mock<IMedicalRecordRepository>();

            _mapperMock =new Mock<IMapper>();

            _medicalRecordService =new MedicalRecordService(_medicalRecordRepositoryMock.Object,
                    _mapperMock.Object);
        }

        [Test]
        public void GetAllMedicalRecords_WhenRecordsExist_ShouldReturnMedicalRecordList()
        {
            // Arrange
            var medicalRecords = new List<MedicalRecord>();

            var medicalRecordDtos =new List<MedicalRecordDto>();

            _medicalRecordRepositoryMock
                .Setup(x => x.GetAllMedicalRecords())
                .Returns(medicalRecords);

            _mapperMock
                .Setup(x => x.Map<List<MedicalRecordDto>>(medicalRecords))
                .Returns(medicalRecordDtos);

            // Act
            var result =
                _medicalRecordService.GetAllMedicalRecords();

            // Assert
            Assert.That(result,
                Is.EqualTo(medicalRecordDtos));
        }

        [Test]
        public void AddMedicalRecord_WhenRecordIsValid_ShouldReturnSuccessMessage()
        {
            // Arrange
            var medicalRecordDto =new MedicalRecordDto();

            var medicalRecord =new MedicalRecord();

            _mapperMock
                .Setup(x => x.Map<MedicalRecord>(medicalRecordDto))
                .Returns(medicalRecord);

            // Act
            string result =_medicalRecordService.AddMedicalRecord(medicalRecordDto);

            // Assert
            Assert.That(result,Is.EqualTo("Medical Record Added Successfully"));

            _medicalRecordRepositoryMock.Verify(
                x => x.AddMedicalRecord(medicalRecord),
                Times.Once);
        }

        [Test]
        public void GetMedicalRecordById_WhenRecordExists_ShouldReturnMedicalRecord()
        {
            // Arrange
            int recordId = 1;

            var medicalRecord =new MedicalRecord();

            var medicalRecordDto = new MedicalRecordDto();

            _medicalRecordRepositoryMock
                .Setup(x => x.GetMedicalRecordById(recordId))
                .Returns(medicalRecord);

            _mapperMock
                .Setup(x => x.Map<MedicalRecordDto>(medicalRecord))
                .Returns(medicalRecordDto);

            // Act
            var result =_medicalRecordService.GetMedicalRecordById(recordId);

            // Assert
            Assert.That(result,
                Is.EqualTo(medicalRecordDto));
        }

        [Test]
        public void UpdateMedicalRecord_WhenRecordExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int recordId = 1;

            var medicalRecord =new MedicalRecord();

            var medicalRecordDto = new MedicalRecordDto();

            _medicalRecordRepositoryMock
                .Setup(x => x.GetMedicalRecordById(recordId))
                .Returns(medicalRecord);

            // Act
            string result =_medicalRecordService.UpdateMedicalRecord(recordId,medicalRecordDto);

            // Assert
            Assert.That(result,
                Is.EqualTo("Medical Record Updated Successfully"));

            _medicalRecordRepositoryMock.Verify(
                x => x.UpdateMedicalRecord(),
                Times.Once);
        }

        [Test]
        public void UpdateMedicalRecord_WhenRecordDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int recordId = 1;

            var medicalRecordDto = new MedicalRecordDto();

            _medicalRecordRepositoryMock
                .Setup(x => x.GetMedicalRecordById(recordId))
                .Returns((MedicalRecord)null);

            // Act
            string result =
                _medicalRecordService.UpdateMedicalRecord(
                    recordId,
                    medicalRecordDto);

            // Assert
            Assert.That(result,Is.EqualTo("Medical Record Not Found"));
        }

        [Test]
        public void DeleteMedicalRecord_WhenRecordExists_ShouldReturnSuccessMessage()
        {
            // Arrange
            int recordId = 1;

            var medicalRecord =
                new MedicalRecord();

            _medicalRecordRepositoryMock
                .Setup(x => x.GetMedicalRecordById(recordId))
                .Returns(medicalRecord);

            // Act
            string result = _medicalRecordService.DeleteMedicalRecord(recordId);

            // Assert
            Assert.That(result,Is.EqualTo("Medical Record Deleted Successfully"));

            _medicalRecordRepositoryMock.Verify(
                x => x.DeleteMedicalRecord(medicalRecord),
                Times.Once);
        }

        [Test]
        public void DeleteMedicalRecord_WhenRecordDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int recordId = 1;

            _medicalRecordRepositoryMock
                .Setup(x => x.GetMedicalRecordById(recordId))
                .Returns((MedicalRecord)null);

            // Act
            string result =
                _medicalRecordService.DeleteMedicalRecord(recordId);

            // Assert
            Assert.That(result,
                Is.EqualTo("Medical Record Not Found"));
        }
    }


}
