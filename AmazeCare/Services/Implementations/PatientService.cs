using AmazeCare.DTO;
using AmazeCare.Models;
using AmazeCare.Repositories.Interfaces;
using AmazeCare.Services.Interfaces;
using AutoMapper;

namespace AmazeCare.Services.Implementations
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;

        public PatientService(IPatientRepository patientRepository, IMapper mapper)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public string AddPatient(PatientDto patientDto)
        {
            var patient = _mapper.Map<Patient>(patientDto);

            _patientRepository.AddPatient(patient);

            return "Patient Added Successfully";
        }

        public List<PatientDto> GetAllPatients()
        {
            var patients = _patientRepository.GetAllPatients();

            return _mapper.Map<List<PatientDto>>(patients);
        }

        public PatientDto GetPatientById(int id)
        {
            var patient = _patientRepository.GetPatientById(id);

            if (patient == null)
            {
                return null;
            }

            return _mapper.Map<PatientDto>(patient);
        }

        public string UpdatePatient(int id, PatientDto patientDto)
        {
            var patient = _patientRepository.GetPatientById(id);

            if (patient == null)
            {
                return "Patient Not Found";
            }

            _mapper.Map(patientDto, patient);

            _patientRepository.UpdatePatient();

            return "Patient Updated Successfully";
        }

        public string DeletePatient(int id)
        {
            var patient = _patientRepository.GetPatientById(id);

            if (patient == null)
            {
                return "Patient Not Found";
            }

            _patientRepository.DeletePatient(patient);

            return "Patient Deleted Successfully";
        }
    }
}