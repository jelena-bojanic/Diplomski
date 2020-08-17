package diplomskiProjekat.ReserveTableApp.service.impl;

import diplomskiProjekat.ReserveTableApp.dto.CreateReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;
import diplomskiProjekat.ReserveTableApp.repository.ReservationRepository;
import diplomskiProjekat.ReserveTableApp.service.CustomerService;
import diplomskiProjekat.ReserveTableApp.service.FacilityService;
import diplomskiProjekat.ReserveTableApp.service.ReservationService;
import diplomskiProjekat.ReserveTableApp.service.TableService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {


    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    TableService tableService;

    @Autowired
    FacilityService facilityService;

    @Override
    public CreateReservationDTO createReservation(ReservationDTO dto) {

        List<Reservation> all = reservationRepository.findAllByTable(tableService.getOne(dto.getTable_id()));
        LocalTime dtoEnd = dto.getStartReservation().plusMinutes(dto.getDuration());
        for(Reservation r : all){
            LocalTime reservationEnd = r.getStartReservation().plusMinutes(r.getDuration());
            if(r.getStartReservation().equals(dto.getStartReservation())){
                return null;
            }
            if(dto.getStartReservation().isAfter(r.getStartReservation()) && dtoEnd.isBefore(reservationEnd)){
                return null;
            }
            if(dto.getStartReservation().isBefore(r.getStartReservation()) && dtoEnd.isAfter(r.getStartReservation()) && dtoEnd.isBefore(reservationEnd)){
                return  null;
            }
        }

        Table table = tableService.getOne(dto.getTable_id());
        Reservation reservation = new Reservation(customerService.findOneByEmail(dto.getCustomerEmail()),table,dto.getDuration(),dto.getStartReservation(),facilityService.getOne(table.getFacility().getId()));
        reservationRepository.save(reservation);
        table.getReservationList().add(reservation);
        Customer c = customerService.findOneByEmail(dto.getCustomerEmail());
        c.getReservations().add(reservation);
        customerService.saveCustomer(c);
        Facility f = facilityService.getOne(table.getFacility().getId());
        CreateReservationDTO createReservationDTO = new CreateReservationDTO(new FacilityDTO(f),facilityService.findAll(),new CustomerDTO(c));
        return  createReservationDTO;
    }

    @Override
    public List<ReservationDTO> findAllByCustomer(Customer customer) {

        List<ReservationDTO> returnList = new ArrayList<>();
        /*for(Reservation r : reservationRepository.findAllByCustomerOrderByReservationDateDesc(customer)){
            ReservationDTO dto = new ReservationDTO(r);
            returnList.add(dto);
        }*/
        return  returnList;
    }
}
