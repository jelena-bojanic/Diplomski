package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.User;
import diplomskiProjekat.ReserveTableApp.model.enums.Role;

public class UserDTO {

    private Long id;

    private String name;

    private String lastname;

    private String email;

    private String password;

    private Role role;

    private String token;

    public UserDTO(Long id, String name, String lastname, String email, String password, Role role) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public UserDTO(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.lastname = user.getLastname();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole();
}

    public  UserDTO () {}

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
