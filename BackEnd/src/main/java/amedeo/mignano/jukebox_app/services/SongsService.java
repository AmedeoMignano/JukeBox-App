package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.Phase;
import amedeo.mignano.jukebox_app.entities.Song;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.payloads.song.SongDTO;
import amedeo.mignano.jukebox_app.repositories.EventsRepository;
import amedeo.mignano.jukebox_app.repositories.SongsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SongsService {
    @Autowired
    private SongsRepository songsRepository;
    @Autowired
    private EventsRepository eventsRepository;

    public Song findById(Long id){
        return songsRepository.findById(id).orElseThrow(() -> new NotFoundException("Canzone non trovata"));
    }
    public Song createSong(SongDTO payload){
        Song newSong = new Song();
        newSong.setTitle(payload.title());
        newSong.setArtist(payload.artist());
        newSong.setCategory(payload.category());
        newSong.setActive(true);
        var saved = songsRepository.save(newSong);
        log.info("Brano " + saved.getTitle() + " salvata correttamente");
        return saved;
    }
    public Song findByIdAndUpdate(Long id, SongDTO payload){
        Song found = this.findById(id);
        found.setTitle(payload.title());
        found.setArtist(payload.artist());
        found.setCategory(payload.category());
        found.setActive(true);
        var updated = songsRepository.save(found);
        log.info("Brano " + found.getTitle() + " aggiornato correttamente");
        return updated;
    }
    public List<Song> getAllSongForCurrentPhase(String accessCode){
        Event event = eventsRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new NotFoundException("Evento non trovato"));
        Phase currentPhase = event.getCurrentPhase();
        return event.getRepertory().stream().
                filter(song -> song.getCategory().name().equals(currentPhase.name())).
                collect(Collectors.toList());
    }
    public void delete(Long id){
        Song song = this.findById(id);
        songsRepository.delete(song);
    }
}
