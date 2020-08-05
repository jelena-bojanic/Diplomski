package diplomskiProjekat.ReserveTableApp.repository;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer save(Customer customer);

}