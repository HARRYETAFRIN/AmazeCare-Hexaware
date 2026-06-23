using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Interfaces;
using AutoMapper;

namespace AmazeCare.Services.Implementations
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly IMedicalRecordRepository _medicalRecordRepository;
        private readonly IMapper _mapper;

        public MedicalRecordService(IMedicalRecordRepository medicalRecordRepository,IMapper mapper)
        {
            _medicalRecordRepository = medicalRecordRepository;
            _mapper = mapper;
        }

        public string AddMedicalRecord(MedicalRecordDto medicalRecordDto)
        {
            var medicalRecord =_mapper.Map<MedicalRecord>(medicalRecordDto);

            _medicalRecordRepository.AddMedicalRecord(medicalRecord);

            return "Medical Record Added Successfully";
        }

        public List<MedicalRecordDto> GetAllMedicalRecords()
        {
            var medicalRecords =_medicalRecordRepository.GetAllMedicalRecords();

            return _mapper.Map<List<MedicalRecordDto>>(medicalRecords);
        }

        public MedicalRecordDto GetMedicalRecordById(int id)
        {
            var medicalRecord =_medicalRecordRepository.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return null;
            }

            return _mapper.Map<MedicalRecordDto>(medicalRecord);
        }

        public string UpdateMedicalRecord(
            int id,
            MedicalRecordDto medicalRecordDto)
        {
            var medicalRecord =_medicalRecordRepository.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return "Medical Record Not Found";
            }

            _mapper.Map(medicalRecordDto, medicalRecord);

            _medicalRecordRepository.UpdateMedicalRecord();

            return "Medical Record Updated Successfully";
        }

        public string DeleteMedicalRecord(int id)
        {
            var medicalRecord =_medicalRecordRepository.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return "Medical Record Not Found";
            }

            _medicalRecordRepository
                .DeleteMedicalRecord(medicalRecord);

            return "Medical Record Deleted Successfully";
        }
    }
}