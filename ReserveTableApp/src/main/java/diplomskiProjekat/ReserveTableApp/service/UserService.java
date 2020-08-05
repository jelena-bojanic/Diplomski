package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findById(Long id);
    User findByUsername(String email);
    List<User> findAll ();
    boolean register(CustomerDTO customer);

}
