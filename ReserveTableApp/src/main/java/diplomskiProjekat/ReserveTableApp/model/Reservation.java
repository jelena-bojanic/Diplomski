package diplomskiProjekat.ReserveTableApp.model;

import com.sun.istack.Nullable;
import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    @JoinTable(name = "reservation_tables", joinColumns = @JoinColumn(name = "reservation_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "table_id", referencedColumnName = "id"))
    private Table table;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private LocalTime startReservation;

    @Column(nullable = false)
    private LocalDate reservationDate = LocalDate.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "facility_reservations", joinColumns = @JoinColumn(name = "reservation_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "facility_id", referencedColumnName = "id"))
    private Facility facility;

    public Reservation() {}

    public Reservation(Customer customer,Table table,int duration,LocalTime startReservation,Facility facility){
        this.customer = customer;
        this.table = table;
        this.duration = duration;
        this.startReservation = startReservation;
        this.facility = facility;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Table getTable() {
        return table;
    }

    public void setTable(Table table) {
        this.table = table;
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

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }
}
