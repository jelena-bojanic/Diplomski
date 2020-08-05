package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;

import javax.persistence.*;
import java.time.LocalTime;

public class ReservationDTO {

    private Long id;

    private String customerEmail;

    private TableDTO table;

    private LocalTime startReservation;

    public ReservationDTO(){}

    public ReservationDTO(Reservation r){
        this.id = r.getId();
        this.customerEmail = r.getCustomer().getEmail();
        this.table = new TableDTO(r.getTable());
        this.startReservation = r.getStartReservation();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public TableDTO getTable() {
        return table;
    }

    public void setTable(TableDTO table) {
        this.table = table;
    }

    public LocalTime getStartReservation() {
        return startReservation;
    }

    public void setStartReservation(LocalTime startReservation) {
        this.startReservation = startReservation;
    }
}
