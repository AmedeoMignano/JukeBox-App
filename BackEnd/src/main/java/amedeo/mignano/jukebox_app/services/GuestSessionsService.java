package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.payloads.guestsession.GuestSessionDTO;
import amedeo.mignano.jukebox_app.repositories.EventsRepository;
import amedeo.mignano.jukebox_app.repositories.GuestSessionsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class GuestSessionsService {
    @Autowired
    private GuestSessionsRepository guestSessionsRepository;
    @Autowired
    private EventsRepository eventsRepository;

    public GuestSession findById(UUID id){
        return guestSessionsRepository.findById(id).orElseThrow(() -> new NotFoundException("Guest Session non trovata"));
    }

    public GuestSessionDTO checkEventAndCreateSession(){
        Event activeEvent = eventsRepository.findByActiveTrue().orElseThrow(() -> new NotFoundException("Evento non trovato"));

       GuestSession session = new GuestSession();
       session.setEvent(activeEvent);
       session.setDateTime(LocalDateTime.now());
       var saved = guestSessionsRepository.save(session);
       log.info("Nuova sessione creata");

       return new GuestSessionDTO(
               session.getId().toString(),
               session.getEvent().getAccessCode(),
               session.getEvent().getName(),
               session.getEvent().getDate(),
               session.getDateTime()
       );
    }
}
