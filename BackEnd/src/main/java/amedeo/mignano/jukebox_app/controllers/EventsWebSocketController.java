package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.payloads.event.EventUpdatePhaseDTO;
import amedeo.mignano.jukebox_app.payloads.event.EventUpdatePhaseResponseDTO;
import amedeo.mignano.jukebox_app.payloads.event.PhaseUpdateResponseDTO;
import amedeo.mignano.jukebox_app.payloads.song.SongReqDTO;
import amedeo.mignano.jukebox_app.services.EventsService;
import amedeo.mignano.jukebox_app.services.SongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class EventsWebSocketController {
    @Autowired
    private EventsService eventsService;
    @Autowired
    private SongsService songsService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;



    @MessageMapping("/event/change-phase")
    public void changePhase(EventUpdatePhaseDTO body){
        var saved = eventsService.updatePhase(body.eventId(), body);
        var dto = EventUpdatePhaseResponseDTO.fromEntity(saved);
        System.out.println("Cambiando fase");
        List<SongReqDTO> songs = songsService.getAllSongForCurrentPhase(saved.getAccessCode()).
                stream().map(SongReqDTO::fromEntity).toList();
        PhaseUpdateResponseDTO payload = new PhaseUpdateResponseDTO(dto.phase(),songs);
        simpMessagingTemplate.convertAndSend("/topic/event/" + saved.getAccessCode() + "/phase", payload);
    }
}
