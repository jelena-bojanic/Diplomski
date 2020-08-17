package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;

public interface CustomerService {

     Customer findOne(Long id);
     Customer findOneByEmail(String email);
     Customer saveCustomer(Customer customer);
}
