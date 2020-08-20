package diplomskiProjekat.ReserveTableApp.dto;

import java.util.List;

public class RemoveReservationDTO {

    FacilityDTO facility;

    List<FacilityDTO> facilites;

    CustomerDTO user;

    RemoveReservationDTO() {}

    public RemoveReservationDTO(FacilityDTO facility, List<FacilityDTO> facilites, CustomerDTO user) {
        this.facility = facility;
        this.facilites = facilites;
        this.user = user;
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

    public CustomerDTO getUser() {
        return user;
    }

    public void setUser(CustomerDTO user) {
        this.user = user;
    }
}
