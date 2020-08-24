package diplomskiProjekat.ReserveTableApp.controller;

import diplomskiProjekat.ReserveTableApp.dto.*;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/facility", produces = MediaType.APPLICATION_JSON_VALUE)
public class FacilityController {

    @Autowired
    FacilityService facilityService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(facilityService.findAll(),HttpStatus.OK);
    }

    @GetMapping(value = "/one/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        FacilityDTO f = new FacilityDTO(facilityService.getOne(id));
        return new ResponseEntity<>(f,HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createFacility(@RequestBody CreateFacilityDTO facility) {
        Facility f = facilityService.saveFacility(facility);
        if(f != null) {
            return new ResponseEntity<>(new FacilityDTO(f),HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteFacility(@PathVariable Long id) {
        DeleteFacilityDTO dto = facilityService.delete(id);
        if( dto != null) {
            return new ResponseEntity<>(dto,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/edit")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> editFaclity(@RequestBody FacilityDTO dto) {
       return new ResponseEntity<>(new EditFacilityDTO(facilityService.updateFacility(dto),facilityService.findAll()),HttpStatus.OK);
    }

}
