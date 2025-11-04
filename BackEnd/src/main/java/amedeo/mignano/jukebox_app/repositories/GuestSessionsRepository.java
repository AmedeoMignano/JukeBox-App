package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.GuestSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GuestSessionsRepository extends JpaRepository<GuestSession, UUID> {
}
