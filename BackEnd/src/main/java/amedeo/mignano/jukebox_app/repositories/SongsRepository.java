package amedeo.mignano.jukebox_app.repositories;

import amedeo.mignano.jukebox_app.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongsRepository extends JpaRepository<Song, Long> {
    Optional<Song> findByTitle(String title);
}
