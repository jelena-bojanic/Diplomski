package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.FacilitesTablesByPlacemntDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Table;
import diplomskiProjekat.ReserveTableApp.model.enums.TablePlacement;
import diplomskiProjekat.ReserveTableApp.repository.TableRepository;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import diplomskiProjekat.ReserveTableApp.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableServiceImpl implements TableService {

    @Autowired
    TableRepository tableRepository;

    @Autowired
    FacilityService facilityService;

    @Override
    public FacilitesTablesByPlacemntDTO findAllFromFacility(Long id) {
        FacilitesTablesByPlacemntDTO dto = new FacilitesTablesByPlacemntDTO();
        List<Table> tables = tableRepository.findAllByFacility(facilityService.getOne(id));
        for(Table t : tables){
            if(t.getPlacement().equals(TablePlacement.INSIDE)){dto.getInside().add(new TableDTO(t));}
            if(t.getPlacement().equals(TablePlacement.GARDEN)){dto.getInGarden().add(new TableDTO(t));}
            if(t.getPlacement().equals(TablePlacement.BALCONY)){dto.getOnBalcony().add(new TableDTO(t));}
        }
        return  dto;
    }
}
