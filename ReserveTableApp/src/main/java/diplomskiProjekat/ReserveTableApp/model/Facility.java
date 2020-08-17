package diplomskiProjekat.ReserveTableApp.model;

import diplomskiProjekat.ReserveTableApp.dto.CreateFacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.FacilityDTO;
import diplomskiProjekat.ReserveTableApp.dto.TableDTO;
import diplomskiProjekat.ReserveTableApp.model.enums.FacilityType;
import org.apache.tomcat.util.codec.binary.Base64;

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

    @ElementCollection
    private List<byte[]> files =  new ArrayList<>();

    @Column
    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    @OneToMany(mappedBy = "facility")
    private List<Table> tables = new ArrayList<>();

    @Column
    private int tableCounter = tables.size();

    @OneToMany(mappedBy = "facility")
    private List<Reservation> reservations;

    public Facility(){}

    public Facility(CreateFacilityDTO facility){
        this.id = facility.getId();
        this.name = facility.getName();
        this.city = facility.getCity();
        this.street = facility.getStreet();
        this.petFriendly = facility.isPetFriendly();
        this.startWorkingHours = facility.getStartWorkingHours();
        this.endWorkingHours = facility.getEndWorkingHours();
        this.contactNumber = facility.getContactNumber();
        this.facilityType = facility.getType();
        //this.getFiles().add(Base64.decodeBase64(facility.getFiles().getBytes()));

    }

    public Facility(FacilityDTO facility){
        this.id = facility.getId();
        this.name = facility.getName();
        this.city = facility.getCity();
        this.street = facility.getStreet();
        this.petFriendly = facility.isPetFriendly();
        this.startWorkingHours = facility.getStartWorkingHours();
        this.endWorkingHours = facility.getEndWorkingHours();
        this.contactNumber = facility.getContactNumber();
        this.facilityType = facility.getType();
        /*for(byte[] img : facility.getStringFiles()) {
            byte[] imgByte = Base64.decodeBase64(img.getBytes());
            this.files.add(imgByte);
        }*/
        this.files.add(facility.getStringFiles());
    }

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

    public List<byte[]> getFiles() {
        return files;
    }

    public void setFiles(List<byte[]> files) {
        this.files = files;
    }

    public FacilityType getFacilityType() {
        return facilityType;
    }

    public void setFacilityType(FacilityType facilityType) {
        this.facilityType = facilityType;
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

    public int getTableCounter() {
        return tableCounter;
    }

    public void setTableCounter(int tableCounter) {
        this.tableCounter = tableCounter;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
