package diplomskiProjekat.ReserveTableApp.repository;

import diplomskiProjekat.ReserveTableApp.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FacilityRepository  extends JpaRepository<Facility, Long> {
    List<Facility> findAll();
    Optional<Facility> findById(Long id);
}
