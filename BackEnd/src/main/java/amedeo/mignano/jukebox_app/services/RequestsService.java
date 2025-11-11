package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Request;
import amedeo.mignano.jukebox_app.entities.Status;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.payloads.request.RequestCreateDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestUpdateStatusDTO;
import amedeo.mignano.jukebox_app.repositories.RequestsRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class RequestsService {
    @Autowired
    private RequestsRepository requestsRepository;
    @Autowired
    private SongsService songsService;
    @Autowired
    private GuestSessionsService guestSessionsService;

    public Request findById(Long id){
        return requestsRepository.findById(id).orElseThrow(() -> new NotFoundException("Richiesta non trovata"));
    }
    @Transactional
    public Request createRequest(RequestCreateDTO payload){
        var session = guestSessionsService.findById(payload.guestId());
        var event = session.getEvent();
        if(!event.isActive()) throw new IllegalArgumentException("Evento non attivo");
        var song = songsService.findById(payload.songId());
        if(!event.getRepertory().contains(song)) throw new IllegalArgumentException("Canzone non in repertorio");

        boolean alreadyExist = requestsRepository.existsByEventAndGuestAndSong(event,session,song);
        if(alreadyExist){
            throw new IllegalStateException("Hai già richiesto questo brano");
        }
        var limitWindow = LocalDateTime.now().minusMinutes(10);
        long recentRequests = requestsRepository.countRecentByGuest(session, limitWindow);
        if(recentRequests > 3){
            throw new IllegalStateException("Non puoi fare più di 3 richieste ogni 10 minuti");
        }

        Request request = new Request();
        request.setGuest(session);
        request.setSong(song);
        request.setEvent(event);
        request.setGuestName(payload.guestName());
        request.setStatus(Status.PENDING);
        var saved = requestsRepository.save(request);
        log.info("Richiesta per il brano: " +  saved.getSong() + "inviata");
        return saved;
    }

    public Request updateStatus(Long id, RequestUpdateStatusDTO payload){
        Request found = this.findById(id);
        found.setStatus(payload.status());
        var updated = requestsRepository.save(found);
        log.info("Stato richiesta per il brano " + updated.getSong());
        return updated;
    }

    public List<Request> getPendingByAccessCode(String accessCode){
        List<Request> requests = requestsRepository.findAllByStatusAndEventAccessCode(Status.PENDING, accessCode);
        if(requests.isEmpty()){
            throw new NotFoundException("Non ci sono richieste in attesa per questo evento");
        }
        return requests;
    }
}