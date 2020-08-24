package diplomskiProjekat.ReserveTableApp.dto;

import java.util.ArrayList;
import java.util.List;

public class DeleteFacilityDTO {


    List<FacilityDTO> facilites = new ArrayList<>();

    public DeleteFacilityDTO(){}

    public DeleteFacilityDTO(List<FacilityDTO> facilites) {
        this.facilites = facilites;
    }

    public List<FacilityDTO> getFacilites() {
        return facilites;
    }

    public void setFacilites(List<FacilityDTO> facilites) {
        this.facilites = facilites;
    }
}
