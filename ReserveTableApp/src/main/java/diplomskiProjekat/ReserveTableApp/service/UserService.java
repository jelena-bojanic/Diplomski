package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.AdminDTO;
import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.dto.EditUserDTO;
import diplomskiProjekat.ReserveTableApp.dto.UserDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.User;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findById(Long id);
    User findByUsername(String email);
    List<User> findAll ();
    boolean register(CustomerDTO customer);
    UserDTO editUser(UserDTO dto);
    boolean updatePassword(UserDTO dto);

}
