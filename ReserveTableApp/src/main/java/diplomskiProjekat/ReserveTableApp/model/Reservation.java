package diplomskiProjekat.ReserveTableApp.model;

import javax.persistence.*;
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
    private Table table;

    @Column
    private LocalTime startReservation;

    public Reservation() {}

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
}
