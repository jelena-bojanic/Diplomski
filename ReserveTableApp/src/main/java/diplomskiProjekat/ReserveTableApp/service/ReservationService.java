package diplomskiProjekat.ReserveTableApp.service;

import diplomskiProjekat.ReserveTableApp.dto.CreateReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.RemoveReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;

import java.util.List;

public interface ReservationService {

        CreateReservationDTO createReservation(ReservationDTO dto);
        List<ReservationDTO> findAllByCustomer(Customer customer);
        RemoveReservationDTO removeReservation(Long id);
}
