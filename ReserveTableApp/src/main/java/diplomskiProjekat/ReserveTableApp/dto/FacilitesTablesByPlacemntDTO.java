package diplomskiProjekat.ReserveTableApp.dto;

import java.util.ArrayList;
import java.util.List;

public class FacilitesTablesByPlacemntDTO {

    List<TableDTO> inGarden = new ArrayList<>();

    List<TableDTO> inside =  new ArrayList<>();

    List<TableDTO> onBalcony = new ArrayList<>();


    public FacilitesTablesByPlacemntDTO(List<TableDTO> inGarden, List<TableDTO> inside, List<TableDTO> onBalcony) {
        this.inGarden = inGarden;
        this.inside = inside;
        this.onBalcony = onBalcony;
    }

    public FacilitesTablesByPlacemntDTO(){}

    public List<TableDTO> getInGarden() {
        return inGarden;
    }

    public void setInGarden(List<TableDTO> inGarden) {
        this.inGarden = inGarden;
    }

    public List<TableDTO> getInside() {
        return inside;
    }

    public void setInside(List<TableDTO> inside) {
        this.inside = inside;
    }

    public List<TableDTO> getOnBalcony() {
        return onBalcony;
    }

    public void setOnBalcony(List<TableDTO> onBalcony) {
        this.onBalcony = onBalcony;
    }
}

