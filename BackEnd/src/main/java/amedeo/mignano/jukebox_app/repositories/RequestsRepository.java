package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.entities.Request;
import amedeo.mignano.jukebox_app.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestsRepository extends JpaRepository<Request, Long> {
    boolean existByEventAndGuestAndSong(Event ev, GuestSession guest, Song song);
}
