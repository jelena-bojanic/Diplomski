package diplomskiProjekat.ReserveTableApp.controller;

import diplomskiProjekat.ReserveTableApp.dto.AdminDTO;
import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.dto.EditUserDTO;
import diplomskiProjekat.ReserveTableApp.dto.UserDTO;
import diplomskiProjekat.ReserveTableApp.model.User;
import diplomskiProjekat.ReserveTableApp.model.UserTokenState;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;
import diplomskiProjekat.ReserveTableApp.security.TokenUtils;
import diplomskiProjekat.ReserveTableApp.security.auth.JwtAuthenticationRequest;
import diplomskiProjekat.ReserveTableApp.service.CustomUserDetailsService;
import diplomskiProjekat.ReserveTableApp.service.CustomerService;
import diplomskiProjekat.ReserveTableApp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CustomerService customerService;

    public AuthenticationController() {}

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody CustomerDTO customerDTO) {

        boolean registered = userService.register(customerDTO);

        if(registered){

            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        else {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody JwtAuthenticationRequest authenticationRequest) {

        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()));
        if(authentication == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails details = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        //username = email in this case
        String jwt = tokenUtils.generateToken(details.getUsername());
        int expiresIn = tokenUtils.getExpiredIn();

        return ResponseEntity.ok(new UserTokenState(jwt, expiresIn));
    }


    @RequestMapping(method = RequestMethod.GET, value = "/user")
    public ResponseEntity<?> getCurrentUser() {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) a.getPrincipal();

        if(user.getRole() == Role.ADMIN) {
            AdminDTO adminDTO = modelMapper.map(user, AdminDTO.class);
            return new ResponseEntity<>(adminDTO, HttpStatus.OK);

        }else if (user.getRole() == Role.CUSTOMER){

            CustomerDTO dto = new CustomerDTO(customerService.findOne(user.getId()));
            return new ResponseEntity<>(dto, HttpStatus.OK);

       }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping(value = "/edit")
    @PreAuthorize("hasAnyAuthority('ADMIN','CUSTOMER')")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO dto) {
        UserDTO returnDTO = userService.editUser(dto);
        if(returnDTO.getRole().equals(Role.CUSTOMER)){
            return new ResponseEntity<>(new CustomerDTO(customerService.findOne(dto.getId())),HttpStatus.OK);
        }else {
            return new ResponseEntity<>(returnDTO, HttpStatus.OK);
        }

    }

    @PutMapping(value = "/update-password")
    @PreAuthorize("hasAnyAuthority('ADMIN','CUSTOMER')")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO dto) {
        userService.updatePassword(dto);
        return  new ResponseEntity<>(HttpStatus.OK);
    }


}
