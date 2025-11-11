package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;

import java.time.LocalDate;

public record EventsDTO(
        Long id,
        String name,
        String location,
        String accessCode,
        LocalDate date
) {
    public static EventsDTO fromEntity(Event ev){
        return new EventsDTO(
                ev.getId(),
                ev.getName(),
                ev.getLocation(),
                ev.getAccessCode(),
                ev.getDate()
        );
    }
}
