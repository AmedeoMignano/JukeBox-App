package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RequestsRepository extends JpaRepository<Request, Long> {
    boolean existsByEventAndGuestAndSong(Event ev, GuestSession guest, Song song);
    List<Request> findAllByStatusAndEventAccessCode(Status status, String accessCode);

    @Query("""
            SELECT COUNT(r)
            FROM Request r
            WHERE r.guest = :guest
            AND r.createdAt > :after
            """)
    long countRecentByGuest(@Param("guest") GuestSession guest, @Param("after") LocalDateTime after);
}
