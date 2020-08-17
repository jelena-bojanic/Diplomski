package diplomskiProjekat.ReserveTableApp.dto;

import diplomskiProjekat.ReserveTableApp.model.enums.Role;

public class EditUserDTO {

    private CustomerDTO customerDTO;

    private AdminDTO adminDTO;

    private Role role;

    public EditUserDTO(){}

    public EditUserDTO(CustomerDTO customerDTO, AdminDTO adminDTO,Role r) {
        this.customerDTO = customerDTO;
        this.adminDTO = adminDTO;
        this.role = r;
    }

    public CustomerDTO getCustomerDTO() {
        return customerDTO;
    }

    public void setCustomerDTO(CustomerDTO customerDTO) {
        this.customerDTO = customerDTO;
    }

    public AdminDTO getAdminDTO() {
        return adminDTO;
    }

    public void setAdminDTO(AdminDTO adminDTO) {
        this.adminDTO = adminDTO;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
