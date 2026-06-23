using AutoMapper;
using AmazeCare.DTO;
using AmazeCare.Models;

namespace AmazeCare.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Doctor, DoctorDto>().ReverseMap();

            CreateMap<DoctorCreateDTO, Doctor>().ReverseMap();


            CreateMap<PatientDto, Patient>().ForMember(dest => dest.PatientId,opt => opt.Ignore());

            CreateMap<Patient, PatientDto>();


            CreateMap<AppointmentCreateDTO, Appointment>().ReverseMap();

            CreateMap<Appointment, AppointmentResponseDTO>().ReverseMap();



            CreateMap<MedicalRecordDto, MedicalRecord>().ForMember(dest => dest.MedicalRecordId,opt => opt.Ignore());

            CreateMap<MedicalRecord, MedicalRecordDto>();


            CreateMap<RegisterDto, User>().ReverseMap();
           
        }
    }
}
