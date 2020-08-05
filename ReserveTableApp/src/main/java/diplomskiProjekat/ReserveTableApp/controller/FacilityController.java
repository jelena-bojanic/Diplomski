package diplomskiProjekat.ReserveTableApp.controller;

import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
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

}
