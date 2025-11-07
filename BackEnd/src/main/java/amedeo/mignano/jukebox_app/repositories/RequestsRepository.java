package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.entities.Request;
import amedeo.mignano.jukebox_app.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface RequestsRepository extends JpaRepository<Request, Long> {
    boolean existsByEventAndGuestAndSong(Event ev, GuestSession guest, Song song);

    @Query("""
            SELECT COUNT(r)
            FROM Request r
            WHERE r.guest = :guest
            AND r.createdAt > :after
            """)
    long contRecentByGuest(@Param("guest") GuestSession guest, @Param("after") LocalDateTime after);
}
