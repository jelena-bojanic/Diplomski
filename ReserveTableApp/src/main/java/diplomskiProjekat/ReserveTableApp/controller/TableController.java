package diplomskiProjekat.ReserveTableApp.controller;

import diplomskiProjekat.ReserveTableApp.dto.DeleteTableDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import diplomskiProjekat.ReserveTableApp.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/table", produces = MediaType.APPLICATION_JSON_VALUE)
public class TableController {

    @Autowired
    private TableService tableService;

    @Autowired
    private FacilityService facilityService;

    @GetMapping(value = "/all-from-facility/{id}")
    public ResponseEntity<?> getAllFromFacility(@PathVariable Long id) {
        return new ResponseEntity<>(tableService.findAllFromFacility(id), HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createTable(@RequestBody TableDTO dto) {
        return new ResponseEntity<>(tableService.saveTable(dto), HttpStatus.OK);
    }

    @PutMapping(value = "/edit")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> editTable(@RequestBody TableDTO dto) {
        return new ResponseEntity<>(tableService.editTable(dto),HttpStatus.OK);
    }

    @GetMapping(value = "/one/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','CUSTOMER')")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(new TableDTO(tableService.getOne(id)),HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteTable(@PathVariable Long id) {
        Long facilityId = tableService.getOne(id).getFacility().getId();
        if(tableService.deleteById(id,facilityId)){
            DeleteTableDTO dto = new DeleteTableDTO(new FacilityDTO(facilityService.getOne(facilityId)),facilityService.findAll());
            return new ResponseEntity<>(dto,HttpStatus.OK);
        }else{
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
