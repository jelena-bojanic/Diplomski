package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.CreateFacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;

import java.util.List;

public interface FacilityService {

    List<FacilityDTO> findAll();
    Facility getOne(Long id);
    Facility saveFacility(CreateFacilityDTO facilityDTO);
    boolean delete(Long id);
    void saveModelFacility(Facility facility);
    FacilityDTO updateFacility(FacilityDTO dto);
}
