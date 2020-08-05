package diplomskiProjekat.ReserveTableApp.model;

import diplomskiProjekat.ReserveTableApp.model.enums.TablePlacement;
import diplomskiProjekat.ReserveTableApp.model.enums.TableZone;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@javax.persistence.Table(name = "tables")
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private Facility facility;

    @Column
    private int tableNum;

    @Column
    @Enumerated(EnumType.STRING)
    private TableZone zone;

    @Column
    @Enumerated(EnumType.STRING)
    private TablePlacement placement;

    @Column
    private boolean isAvailable;

    @OneToMany(mappedBy = "table", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reservation> reservationList = new ArrayList<>();

    public Table() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
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

    public List<Reservation> getReservationList() {
        return reservationList;
    }

    public void setReservationList(List<Reservation> reservationList) {
        this.reservationList = reservationList;
    }
}
