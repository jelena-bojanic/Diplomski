package diplomskiProjekat.ReserveTableApp.dto;

public class FilterDTO {

    private String name;

    private boolean openNow;

    private boolean petFriendly;

    public FilterDTO(){}

    public FilterDTO(String name, boolean openNow, boolean petFriendly) {
        this.name = name;
        this.openNow = openNow;
        this.petFriendly = petFriendly;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isOpenNow() {
        return openNow;
    }

    public void setOpenNow(boolean openNow) {
        this.openNow = openNow;
    }

    public boolean isPetFriendly() {
        return petFriendly;
    }

    public void setPetFriendly(boolean petFriendly) {
        this.petFriendly = petFriendly;
    }
}
