package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.CreateReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;

import java.util.List;

public interface ReservationService {

        CreateReservationDTO createReservation(ReservationDTO dto);
        List<ReservationDTO> findAllByCustomer(Customer customer);
}
