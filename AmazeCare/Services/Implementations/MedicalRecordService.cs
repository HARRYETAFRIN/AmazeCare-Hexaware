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
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;

        public MedicalRecordService(
            IMedicalRecordRepository medicalRecordRepository,
            IAppointmentRepository appointmentRepository,
            IMapper mapper)
        {
            _medicalRecordRepository = medicalRecordRepository;
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
        }

        public string AddMedicalRecord(MedicalRecordDto medicalRecordDto)
        {
            var medicalRecord = _mapper.Map<MedicalRecord>(medicalRecordDto);

            // Save Medical Record
            _medicalRecordRepository.AddMedicalRecord(medicalRecord);

            // Update Appointment Status to Completed
            var appointment = _appointmentRepository
                .GetAppointmentById(medicalRecord.AppointmentId);

            if (appointment != null)
            {
                appointment.Status = "Completed";
                _appointmentRepository.SaveChanges();
            }

            return "Medical Record Added Successfully";
        }

        public List<MedicalRecordDto> GetAllMedicalRecords()
        {
            var medicalRecords =
                _medicalRecordRepository.GetAllMedicalRecords();

            return _mapper.Map<List<MedicalRecordDto>>(medicalRecords);
        }

        public MedicalRecordDto GetMedicalRecordById(int id)
        {
            var medicalRecord =
                _medicalRecordRepository.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return null;
            }

            return _mapper.Map<MedicalRecordDto>(medicalRecord);
        }

        public List<MedicalRecordDto> GetMedicalRecordsByDoctorId(int doctorId)
        {
            var records =
                _medicalRecordRepository.GetMedicalRecordsByDoctorId(doctorId);

            return _mapper.Map<List<MedicalRecordDto>>(records);
        }

        public List<MedicalRecordDto> GetMedicalRecordsByPatientId(int patientId)
        {
            var records =
                _medicalRecordRepository.GetMedicalRecordsByPatientId(patientId);

            return _mapper.Map<List<MedicalRecordDto>>(records);
        }

        public MedicalRecordDto GetMedicalRecordByAppointmentId(int appointmentId)
        {
            var record = _medicalRecordRepository
                .GetMedicalRecordByAppointmentId(appointmentId);

            if (record == null)
                return null;

            return _mapper.Map<MedicalRecordDto>(record);
        }
        public string UpdateMedicalRecord(
            int id,
            MedicalRecordDto medicalRecordDto)
        {
            var medicalRecord =
                _medicalRecordRepository.GetMedicalRecordById(id);

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
            var medicalRecord =
                _medicalRecordRepository.GetMedicalRecordById(id);

            if (medicalRecord == null)
            {
                return "Medical Record Not Found";
            }

            _medicalRecordRepository.DeleteMedicalRecord(medicalRecord);

            return "Medical Record Deleted Successfully";
        }
    }
}