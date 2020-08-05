package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.FacilitesTablesByPlacemntDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Table;

import java.util.List;

public interface TableService {

    FacilitesTablesByPlacemntDTO findAllFromFacility(Long id);
}
