package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;

public record EventDTO(
        Long id,
        String name,
        String accessCode,
        String location
) {
    public static EventDTO fromEntity(Event ev){
        return new EventDTO(
                ev.getId(),
                ev.getName(),
                ev.getAccessCode(),
                ev.getLocation()
        );
    }
}
