package diplomskiProjekat.ReserveTableApp.controller;

import com.sun.org.apache.regexp.internal.RE;
import diplomskiProjekat.ReserveTableApp.dto.CreateFacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.CreateReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.User;
import diplomskiProjekat.ReserveTableApp.service.CustomerService;
import diplomskiProjekat.ReserveTableApp.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/reservation", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @Autowired
    CustomerService customerService;

    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO dto, Principal principal) {
        CreateReservationDTO createReservationDTO = reservationService.createReservation(dto);
        if(createReservationDTO != null) {
            return new ResponseEntity<>(createReservationDTO, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/all-by-user")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> getAllByUser() {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) a.getPrincipal();
        return new ResponseEntity<>(reservationService.findAllByCustomer(customerService.findOneByEmail(user.getEmail())),HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        return new ResponseEntity<>(reservationService.removeReservation(id),HttpStatus.OK);
    }

}
