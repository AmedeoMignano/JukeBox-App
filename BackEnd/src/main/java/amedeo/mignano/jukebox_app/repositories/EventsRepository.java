package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventsRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByAccessCode(String accessCode);
    Optional<Event> findByActiveTrue();
    Optional<Event> findByDate(LocalDate date);
    List<Event> findAllByRepertoryContains(Song song);
}
