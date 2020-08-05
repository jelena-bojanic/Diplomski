package diplomskiProjekat.ReserveTableApp.repository;

import diplomskiProjekat.ReserveTableApp.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(String name);
}
