package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class ReservationDTO {

    private Long id;

    private String customerEmail;

    private Long table_id;

    private LocalTime startReservation;

    private int duration;

    private LocalDate reservationDate;

    private String facilityName;

    private Long facilityId;

    public ReservationDTO(){}

    public ReservationDTO(Reservation r){
        this.id = r.getId();
        this.customerEmail = r.getCustomer().getEmail();
        this.table_id = r.getTable().getId();
        this.startReservation = r.getStartReservation();
        this.duration = r.getDuration();
        this.reservationDate = r.getReservationDate();
        this.facilityName = r.getFacility().getName();
        this.facilityId = r.getFacility().getId();
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

    public Long getTable_id() {
        return table_id;
    }

    public void setTable_id(Long table_id) {
        this.table_id = table_id;
    }

    public LocalTime getStartReservation() {
        return startReservation;
    }

    public void setStartReservation(LocalTime startReservation) {
        this.startReservation = startReservation;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }

    public Long getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(Long facilityId) {
        this.facilityId = facilityId;
    }
}
