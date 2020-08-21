package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.EditTableDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilitesTablesByPlacemntDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;
import diplomskiProjekat.ReserveTableApp.model.enums.TablePlacement;
import diplomskiProjekat.ReserveTableApp.repository.TableRepository;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import diplomskiProjekat.ReserveTableApp.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @Override
    public TableDTO saveTable(TableDTO tableDTO) {
        Table table = new Table(tableDTO);
        Facility f = facilityService.getOne(tableDTO.getFacilityId());
        f.setTableCounter(f.getTableCounter()+1);
        table.setTableNum(f.getTableCounter());
        table.setFacility(f);
        Table saved = tableRepository.save(table);
        if(saved != null){
            //f.getTables().add(table);
            return new TableDTO(saved);
        }else{
            return null;
        }
    }

    @Override
    public boolean deleteById(Long id,Long facilityId) {
        Table t = tableRepository.findById(id).get();
        for(Reservation r : t.getReservationList()){
            if(r.getReservationDate().isAfter(LocalDate.now()) || r.getReservationDate().isEqual(LocalDate.now())){
                return false;
            }
        }

        Facility f = facilityService.getOne(facilityId);
        List<Table> tables = f.getTables();
        for(Table table : tables){
            if( table.getId() == t.getId()){
                tables.remove(table);
                tableRepository.deleteById(id);
                return true;
            }
        }
            return  true;

    }

    @Override
    public Table getOne(Long id) {
        return tableRepository.findById(id).get();
    }

    @Override
    public EditTableDTO editTable(TableDTO dto) {
        Table original = tableRepository.findById(dto.getId()).get();

        if(original.getPlacement() != dto.getPlacement()){
            original.setPlacement(dto.getPlacement());
        }
        if(original.getZone() != dto.getZone()){
            original.setZone(dto.getZone());
        }
        if(original.getNumberOfSeats() != dto.getNumberOfSeats()){
            original.setNumberOfSeats(dto.getNumberOfSeats());
        }

        EditTableDTO editTableDTO = new EditTableDTO();
        tableRepository.save(original);

        Facility f = facilityService.getOne(dto.getFacilityId());
        List<Table> tables = f.getTables();
        for(Table table : tables){
            if( table.getId() == dto.getId()){
                tables.remove(table);
                tables.add(original);
                return new EditTableDTO(new FacilityDTO(f),facilityService.findAll());
            }
        }
        return null;
    }
}
