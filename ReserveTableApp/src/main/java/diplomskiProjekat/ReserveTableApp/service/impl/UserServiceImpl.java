package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.AdminDTO;
import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.dto.EditUserDTO;
import diplomskiProjekat.ReserveTableApp.dto.UserDTO;
import diplomskiProjekat.ReserveTableApp.model.Authority;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.User;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;
import diplomskiProjekat.ReserveTableApp.repository.CustomerRepository;
import diplomskiProjekat.ReserveTableApp.repository.UserRepository;
import diplomskiProjekat.ReserveTableApp.service.AuthorityService;
import diplomskiProjekat.ReserveTableApp.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User findByUsername(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public boolean register(CustomerDTO customer) {
        if(userRepository.findByEmail(customer.getEmail()) == null){
            Customer c = modelMapper.map(customer,Customer.class);
            c.setPassword(passwordEncoder.encode(customer.getPassword()));
            c.setRole(Role.CUSTOMER);
            Authority authoritie = authorityService.findByname("CUSTOMER");
            List<Authority> authorities = new ArrayList<>();
            authorities.add(authoritie);
            c.setAuthorities(authorities);

            if(customerRepository.save(c) != null){
                return true;
            }

        }

        return false;
    }

    @Override
    public UserDTO editUser(UserDTO dto) {
        User original =  original = userRepository.findById(dto.getId()).get();

        if(original.getName() != dto.getName()){
            original.setName(dto.getName());
        }
        if(original.getLastname() != dto.getLastname()){
            original.setLastname(dto.getLastname());
        }
        userRepository.save(original);
        return new UserDTO(original);
    }

    @Override
    public boolean updatePassword(UserDTO dto) {
        User u = userRepository.findById(dto.getId()).get();
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(u);
        return  true;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = (userRepository.findByEmail(email));

        if(user == null)
            throw new UsernameNotFoundException("User with "+ email+" doesn't exists!");

        return user;
    }
}
