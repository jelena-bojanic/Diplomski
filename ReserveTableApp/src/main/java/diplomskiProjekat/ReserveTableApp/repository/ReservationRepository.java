package diplomskiProjekat.ReserveTableApp.repository;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByTable(Table table);
    Reservation save(Reservation r);
    List<Reservation> findAllByCustomerOrderByReservationDateDesc(Customer customer);
    void deleteById(Long id);
}
