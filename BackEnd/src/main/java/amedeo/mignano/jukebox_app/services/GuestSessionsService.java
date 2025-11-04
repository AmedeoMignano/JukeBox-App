package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.repositories.GuestSessionsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class GuestSessionsService {
    @Autowired
    private GuestSessionsRepository guestSessionsRepository;

    public GuestSession findById(UUID id){
        return guestSessionsRepository.findById(id).orElseThrow(() -> new NotFoundException("Guest Session non trovata"));
    }
}
