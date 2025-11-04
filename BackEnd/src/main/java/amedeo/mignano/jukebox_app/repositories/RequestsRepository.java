package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestsRepository extends JpaRepository<Request, Long> {
}
