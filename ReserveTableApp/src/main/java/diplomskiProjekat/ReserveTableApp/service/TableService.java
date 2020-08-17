package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.EditTableDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilitesTablesByPlacemntDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
import diplomskiProjekat.ReserveTableApp.model.Table;

import java.util.Optional;

public interface TableService {

    FacilitesTablesByPlacemntDTO findAllFromFacility(Long id);
    TableDTO saveTable(TableDTO tableDTO);
    boolean deleteById(Long id,Long facilityId);
    Table getOne(Long id);
    EditTableDTO editTable(TableDTO dto);
}
