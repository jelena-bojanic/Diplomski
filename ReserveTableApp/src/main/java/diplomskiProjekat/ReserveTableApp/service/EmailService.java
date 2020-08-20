package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {

    public void notifyCustomer(Customer customer, Reservation reservation);
}
