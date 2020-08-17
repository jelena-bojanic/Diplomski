package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.CreateFacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.repository.FacilityRepository;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<FacilityDTO> findAll() {
        List<FacilityDTO> dtos = new ArrayList<>();
        for(Facility f : facilityRepository.findAll()){
            FacilityDTO dto = new FacilityDTO(f);
            dtos.add(dto);
        }
        return  dtos;
    }

    @Override
    public Facility getOne(Long id) {
        Facility f =  facilityRepository.findById(id).get();
        return f;
    }

    @Override
    public Facility saveFacility(CreateFacilityDTO facilityDTO) {
            Facility f = new Facility(facilityDTO);
            if(facilityRepository.save(f) != null){
                //f.getFiles().add(Base64.decodeBase64(facilityDTO.getFiles().getBytes()));
                return f;
            }else{
                return null;
            }
    }

    @Override
    public boolean delete(Long id) {
        if(facilityRepository.findById(id).get().getTables().size() != 0){
            return  false;
        }else{
            facilityRepository.deleteById(id);
            return  true;
        }

    }

    @Override
    public void saveModelFacility(Facility facility) {
        facilityRepository.save(facility);
    }

    @Override
    public FacilityDTO updateFacility(FacilityDTO dto) {
        Facility original = facilityRepository.findById(dto.getId()).get();

        if(original.getName() != dto.getName()){
            original.setName(dto.getName());
        }
        if(original.getCity() != dto.getCity()){
            original.setCity(dto.getCity());
        }
        if(original.isPetFriendly() != dto.isPetFriendly()){
            original.setPetFriendly(dto.isPetFriendly());
        }
        if(original.getStartWorkingHours() != dto.getStartWorkingHours()){
            original.setStartWorkingHours(dto.getStartWorkingHours());
        }
        if(original.getEndWorkingHours() != dto.getEndWorkingHours()){
            original.setEndWorkingHours(dto.getEndWorkingHours());
        }
        if(original.getContactNumber() != dto.getContactNumber()){
            original.setContactNumber(dto.getContactNumber());
        }
        if(!original.getType().equals(dto.getType())){
            original.setType(dto.getType());
        }

        facilityRepository.save(original);
        return new FacilityDTO(original);
    }

}
