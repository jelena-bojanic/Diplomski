package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;

import java.util.List;

public interface FacilityService {

    List<FacilityDTO> findAll();
    Facility getOne(Long id);
}
