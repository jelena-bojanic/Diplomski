package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Facility;

import java.util.ArrayList;
import java.util.List;

public class DeleteTableDTO {

    FacilityDTO facility;

    List<FacilityDTO> facilites = new ArrayList<>();

    public DeleteTableDTO(FacilityDTO facility, List<FacilityDTO> facilites) {
        this.facility = facility;
        this.facilites = facilites;
    }

    public DeleteTableDTO(){}

    public FacilityDTO getFacility() {
        return facility;
    }

    public void setFacility(FacilityDTO facility) {
        this.facility = facility;
    }

    public List<FacilityDTO> getFacilites() {
        return facilites;
    }

    public void setFacilites(List<FacilityDTO> facilites) {
        this.facilites = facilites;
    }
}
