package diplomskiProjekat.ReserveTableApp.model;

import diplomskiProjekat.ReserveTableApp.dto.ReservationDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
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
    @JoinTable(name = "facility_tables", joinColumns = @JoinColumn(name = "table_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "facility_id", referencedColumnName = "id"))
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

    @Column(nullable = false)
    private int numberOfSeats;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "table")
    private List<Reservation> reservationList = new ArrayList<>();

    public Table() {}

    public Table(TableDTO table) {
        this.id = table.getId();
        this.tableNum = table.getTableNum();
        this.zone = table.getZone();
        this.placement = table.getPlacement();
        this.isAvailable = table.isAvailable();
        this.numberOfSeats = table.getNumberOfSeats();
    }

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

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(int numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
}
