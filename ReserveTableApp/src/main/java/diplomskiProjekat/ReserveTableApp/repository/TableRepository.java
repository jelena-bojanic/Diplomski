package diplomskiProjekat.ReserveTableApp.repository;

import diplomskiProjekat.ReserveTableApp.model.Facility;
import diplomskiProjekat.ReserveTableApp.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TableRepository extends JpaRepository<Table, Long> {

    List<Table> findAllByFacility(Facility f);
    Table save(Table table);
    void deleteById(Long id);
    Optional<Table> findById(Long id);
}
