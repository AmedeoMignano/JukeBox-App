package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.Phase;
import amedeo.mignano.jukebox_app.entities.Song;
import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.BadRequestException;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.payloads.event.EventCreateDTO;
import amedeo.mignano.jukebox_app.payloads.event.EventRepertoryUpdateDTO;
import amedeo.mignano.jukebox_app.payloads.event.EventUpdateBasicDTO;
import amedeo.mignano.jukebox_app.payloads.event.EventUpdatePhaseDTO;
import amedeo.mignano.jukebox_app.repositories.EventsRepository;
import amedeo.mignano.jukebox_app.repositories.SongsRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class EventsService {
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private SongsRepository songsRepository;

    public Event createEvent(EventCreateDTO payload, User authenticated){
       eventsRepository.findByDate(payload.date()).ifPresent(event -> {
            throw new BadRequestException("Non possono esserci più eventi per la stessa data");
        });
        Event event = new Event();
        event.setName(payload.name());
        event.setLocation(payload.location());
        event.setDate(payload.date());
        if(payload.active()){
            eventsRepository.findAll().forEach(e -> e.setActive(false) );
        }
        event.setActive(payload.active());
        event.setAccessCode(generateAccessCode());
        event.setCurrentPhase(Phase.CENA);
        event.setCreatedBy(authenticated);
        if(payload.songsId() != null && !payload.songsId().isEmpty()){
            List<Song> songs = songsRepository.findAllById(payload.songsId());
            event.setRepertory(songs);
        }
        var saved = eventsRepository.save(event);
        log.info("Evento " + saved.getName() + " creato correttamente");
        return saved;
    }

    public Optional<Event> getTodayEvent() {
        LocalDate today = LocalDate.now();
        return eventsRepository.findByDate(today);
    }
    @Transactional
    @Scheduled(cron = "0 0 3 * * *",  zone = "Europe/Rome")
    public void activateTodayEvent(){
        eventsRepository.findAll().forEach(event -> event.setActive(false));
        this.getTodayEvent().ifPresent(event -> event.setActive(true));
    }

    public String generateAccessCode(){
      return UUID.randomUUID().toString().substring(0,5).toUpperCase();
    }
    public Event findById(Long id){
       return eventsRepository.findById(id).orElseThrow(() -> new NotFoundException("Impossibile trovare l'evento"));
    }
    public Event findByIdAndUpdateBasic(Long id, EventUpdateBasicDTO payload){
        Event found = this.findById(id);
        if(!found.getDate().equals(payload.date())){
            eventsRepository.findByDate(payload.date()).ifPresent(event -> {
                throw new BadRequestException("Non possono esserci più eventi per la stessa data");
            });
        }
        found.setDate(payload.date());
        found.setName(payload.name());
        found.setLocation(payload.location());
        if (payload.active()) {
            eventsRepository.findByActiveTrue().ifPresent(other -> {
                if (!other.getId().equals(found.getId())) {
                    other.setActive(false);
                    eventsRepository.save(other);
                }
            });
            found.setActive(true);
        }else {
            found.setActive(false);
        }
        var saved = eventsRepository.save(found);
        log.info("Evento " + saved.getId() + " aggiornato correttamente");
        return saved;
    }
    @Transactional
    public Event updatePhase(Long id, EventUpdatePhaseDTO payload){
        Event found = this.findById(id);
        found.setCurrentPhase(payload.phase());
        var saved = eventsRepository.save(found);
        log.info("Fase Evento aggiornato");
        return saved;
    }
    public Event updateRepertory(Long id, EventRepertoryUpdateDTO payload){
        Event found = this.findById(id);
        if(payload.addSongsIds() != null && !payload.addSongsIds().isEmpty()){
            found.getRepertory().addAll(songsRepository.findAllById(payload.addSongsIds()));
        }
        if(payload.removeSongsIds() != null && !payload.removeSongsIds().isEmpty()){
            found.getRepertory().removeAll(songsRepository.findAllById(payload.removeSongsIds()));
        }
        var updated = eventsRepository.save(found);
        log.info("Repertorio aggiornato");
        return updated;
    }

    public void delete(Long id){
        var found = this.findById(id);
        eventsRepository.delete(found);
    }
    public List<Event> getAll(){
        return eventsRepository.findAll();
    }

}
