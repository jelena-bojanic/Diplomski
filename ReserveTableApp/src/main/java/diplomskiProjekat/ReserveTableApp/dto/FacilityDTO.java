package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Table;
import diplomskiProjekat.ReserveTableApp.model.enums.FacilityType;
import diplomskiProjekat.ReserveTableApp.model.enums.TablePlacement;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class FacilityDTO {

    private Long id;

    private String name;

    private String city;

    private String street;

    private boolean petFriendly;

    private LocalTime startWorkingHours;

    private LocalTime endWorkingHours;

    private String contactNumber;

    private byte[] stringFiles;

    private FacilityType type;

    private List<TableDTO> tables = new ArrayList<>();

    private FacilitesTablesByPlacemntDTO facilitesTablesByPlacemntDTO = new FacilitesTablesByPlacemntDTO();

    public FacilityDTO(){}

    public FacilityDTO(Facility facility){
        this.id = facility.getId();
        this.name = facility.getName();
        this.city = facility.getCity();
        this.street = facility.getStreet();
        this.petFriendly = facility.isPetFriendly();
        this.startWorkingHours = facility.getStartWorkingHours();
        this.endWorkingHours = facility.getEndWorkingHours();
        this.contactNumber = facility.getContactNumber();
        this.type = facility.getType();
        for(Table table : facility.getTables()){
            if(table.getPlacement().equals(TablePlacement.INSIDE)){
                this.facilitesTablesByPlacemntDTO.getInside().add(new TableDTO(table));
            }
            if(table.getPlacement().equals(TablePlacement.GARDEN)){
                this.facilitesTablesByPlacemntDTO.getInGarden().add(new TableDTO(table));
            }
            if(table.getPlacement().equals(TablePlacement.BALCONY)){
                this.facilitesTablesByPlacemntDTO.getOnBalcony().add(new TableDTO(table));
            }
            this.tables.add(new TableDTO(table));
        }
        if(facility.getFiles().size() != 0) {
            this.stringFiles = facility.getFiles().get(0);
        }
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

    public byte[] getStringFiles() {
        return stringFiles;
    }

    public void setStringFiles(byte[] stringFiles) {
        this.stringFiles = stringFiles;
    }

    public FacilityType getType() {
        return type;
    }

    public void setType(FacilityType type) {
        this.type = type;
    }

    public List<TableDTO> getTables() {
        return tables;
    }

    public void setTables(List<TableDTO> tables) {
        this.tables = tables;
    }

    public FacilitesTablesByPlacemntDTO getFacilitesTablesByPlacemntDTO() {
        return facilitesTablesByPlacemntDTO;
    }

    public void setFacilitesTablesByPlacemntDTO(FacilitesTablesByPlacemntDTO facilitesTablesByPlacemntDTO) {
        this.facilitesTablesByPlacemntDTO = facilitesTablesByPlacemntDTO;
    }
}
