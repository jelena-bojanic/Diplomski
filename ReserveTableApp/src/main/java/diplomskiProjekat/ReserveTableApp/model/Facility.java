package diplomskiProjekat.ReserveTableApp.model;

import diplomskiProjekat.ReserveTableApp.model.enums.FacilityType;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String street;

    @Column(name = "pet")
    private boolean petFriendly;

    @Column(name = "startTime")
    private LocalTime startWorkingHours;

    @Column(name = "endTime")
    private LocalTime endWorkingHours;

    @Column
    private String contactNumber;

    private byte[] image;

    @Column
    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Table> tables = new ArrayList<>();

    public Facility(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public boolean isPetFriendly() {
        return petFriendly;
    }

    public void setPetFriendly(boolean petFriendly) {
        this.petFriendly = petFriendly;
    }

    public LocalTime getStartWorkingHours() {
        return startWorkingHours;
    }

    public void setStartWorkingHours(LocalTime startWorkingHours) {
        this.startWorkingHours = startWorkingHours;
    }

    public LocalTime getEndWorkingHours() {
        return endWorkingHours;
    }

    public void setEndWorkingHours(LocalTime endWorkingHours) {
        this.endWorkingHours = endWorkingHours;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public FacilityType getType() {
        return facilityType;
    }

    public void setType(FacilityType type) {
        this.facilityType = type;
    }

    public List<Table> getTables() {
        return tables;
    }

    public void setTables(List<Table> tables) {
        this.tables = tables;
    }


}
