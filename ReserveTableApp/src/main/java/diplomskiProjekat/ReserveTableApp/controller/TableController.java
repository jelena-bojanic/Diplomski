package diplomskiProjekat.ReserveTableApp.controller;

import diplomskiProjekat.ReserveTableApp.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/table", produces = MediaType.APPLICATION_JSON_VALUE)
public class TableController {

    @Autowired
    private TableService tableService;

    @RequestMapping(method = RequestMethod.GET, value = "/all-from-facility/{id}")
    public ResponseEntity<?> getAllFromFacility(@PathVariable Long id) {
        return new ResponseEntity<>(tableService.findAllFromFacility(id), HttpStatus.OK);
    }
}
