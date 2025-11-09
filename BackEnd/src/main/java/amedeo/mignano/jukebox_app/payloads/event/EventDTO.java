package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.Request;

import java.util.List;

public record EventDTO(
        Long id,
        String name,
        String accessCode,
        String location,
        List<Request> requests
) {
    public static EventDTO fromEntity(Event ev){
        return new EventDTO(
                ev.getId(),
                ev.getName(),
                ev.getAccessCode(),
                ev.getLocation(),
                ev.getRequests()
        );
    }
}
