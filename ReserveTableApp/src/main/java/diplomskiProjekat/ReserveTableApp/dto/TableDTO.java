package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.Table;
import diplomskiProjekat.ReserveTableApp.model.enums.TablePlacement;
import diplomskiProjekat.ReserveTableApp.model.enums.TableZone;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TableDTO {

    private Long id;

    private String facilityName;

    private Long facilityId;

    private int tableNum;

    private TableZone zone;

    private TablePlacement placement;

    private boolean isAvailable;

    private List<ReservationDTO> reservationList = new ArrayList<>();

    private int numberOfSeats;

    public TableDTO(){}

    public TableDTO(Table table){
        this.id = table.getId();
        this.facilityName = table.getFacility().getName();
        this.tableNum = table.getTableNum();
        this.zone = table.getZone();
        this.placement = table.getPlacement();
        this.isAvailable = table.isAvailable();
        for(Reservation r: table.getReservationList()){
            if(r.getReservationDate().equals(LocalDate.now())) {
                ReservationDTO dto = new ReservationDTO(r);
                this.reservationList.add(dto);
            }
        }
        this.facilityId = table.getFacility().getId();
        this.numberOfSeats = table.getNumberOfSeats();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }

    public int getTableNum() {
        return tableNum;
    }

    public void setTableNum(int tableNum) {
        this.tableNum = tableNum;
    }

    public TableZone getZone() {
        return zone;
    }

    public void setZone(TableZone zone) {
        this.zone = zone;
    }

    public TablePlacement getPlacement() {
        return placement;
    }

    public void setPlacement(TablePlacement placement) {
        this.placement = placement;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public List<ReservationDTO> getReservationList() {
        return reservationList;
    }

    public void setReservationList(List<ReservationDTO> reservationList) {
        this.reservationList = reservationList;
    }

    public Long getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(Long facilityId) {
        this.facilityId = facilityId;
    }

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(int numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
}
