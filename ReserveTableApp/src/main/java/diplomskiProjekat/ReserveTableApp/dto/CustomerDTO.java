package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.Customer;
import diplomskiProjekat.ReserveTableApp.model.Reservation;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;

import java.util.ArrayList;
import java.util.List;

public class CustomerDTO {

    private Long id;

    private String name;

    private String lastname;

    private String email;

    private String password;

    private Role role;

    private List<ReservationDTO> reservations =  new ArrayList<>();

    public CustomerDTO(){}

    public CustomerDTO(Customer customer){
        this.id = customer.getId();
        this.name = customer.getName();
        this.lastname = customer.getLastname();
        this.email = customer.getEmail();
        this.password = customer.getPassword();
        this.role = customer.getRole();

        for(Reservation r : customer.getReservations()){
            ReservationDTO dto = new ReservationDTO(r);
            this.getReservations().add(dto);
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

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<ReservationDTO> getReservations() {
        return reservations;
    }

    public void setReservations(List<ReservationDTO> reservations) {
        this.reservations = reservations;
    }
}
