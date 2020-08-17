package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Facility;

import java.util.ArrayList;
import java.util.List;

public class CreateReservationDTO {

    FacilityDTO facilityDTO;

    List<FacilityDTO> facilites = new ArrayList<>();

    CustomerDTO user;

    public CreateReservationDTO() {}

    public CreateReservationDTO(FacilityDTO facilityDTO, List<FacilityDTO> facilites, CustomerDTO customerDTO) {
        this.facilityDTO = facilityDTO;
        this.facilites = facilites;
        this.user = customerDTO;
    }

    public FacilityDTO getFacilityDTO() {
        return facilityDTO;
    }

    public void setFacilityDTO(FacilityDTO facilityDTO) {
        this.facilityDTO = facilityDTO;
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
