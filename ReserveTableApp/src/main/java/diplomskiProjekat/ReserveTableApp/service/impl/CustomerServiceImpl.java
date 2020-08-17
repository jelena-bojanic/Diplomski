package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.repository.CustomerRepository;
import diplomskiProjekat.ReserveTableApp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer findOne(Long id) {
        return customerRepository.getOne(id);
    }

    @Override
    public Customer findOneByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return  customerRepository.save(customer);
    }
}
