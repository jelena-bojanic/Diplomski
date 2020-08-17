package diplomskiProjekat.ReserveTableApp.dto;

import java.util.ArrayList;
import java.util.List;

public class FacilityImageDTO {

    List<byte []> files = new ArrayList<>();

    public FacilityImageDTO(){}

    public List<byte[]> getFiles() {
        return files;
    }

    public void setFiles(List<byte[]> files) {
        this.files = files;
    }
}
