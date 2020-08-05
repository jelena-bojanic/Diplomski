package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.repository.FacilityRepository;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacilityServiceImpl implements FacilityService {

    @Autowired
    FacilityRepository facilityRepository;

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
        return facilityRepository.findById(id).get();
    }
}
