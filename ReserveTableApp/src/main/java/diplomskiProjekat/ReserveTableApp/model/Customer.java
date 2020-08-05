package diplomskiProjekat.ReserveTableApp.model;

import diplomskiProjekat.ReserveTableApp.dto.CustomerDTO;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Customer extends  User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    public Customer() {
    }

    public Customer(Long id, Role role, String name, String lastname, String email, String password) {
        super(id, role, name, lastname, email, password);
    }

    public Customer(CustomerDTO dto){
        this.setRole(dto.getRole());
        this.setName(dto.getName());
        this.setLastname(dto.getLastname());
        this.setEmail(dto.getEmail());
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
