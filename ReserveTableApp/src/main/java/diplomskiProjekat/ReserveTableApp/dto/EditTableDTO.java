package diplomskiProjekat.ReserveTableApp.dto;

import java.util.ArrayList;
import java.util.List;

public class EditTableDTO {

    private FacilityDTO facility;

    private List<FacilityDTO> facilites = new ArrayList<>();

    public EditTableDTO(){}

    public EditTableDTO(FacilityDTO facility, List<FacilityDTO> facilites) {
        this.facility = facility;
        this.facilites = facilites;
    }

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
