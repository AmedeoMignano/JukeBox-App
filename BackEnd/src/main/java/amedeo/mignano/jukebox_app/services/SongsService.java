package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Song;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.repositories.SongsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.NonTransientDataAccessException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SongsService {
    @Autowired
    private SongsRepository songsRepository;

    public Song findById(Long id){
        return songsRepository.findById(id).orElseThrow(() -> new NotFoundException("Canzone non trovata"));
    }
}
