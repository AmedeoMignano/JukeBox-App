package amedeo.mignano.jukebox_app.payloads.guestsession;

import amedeo.mignano.jukebox_app.entities.GuestSession;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GuestSessionDTO(
        String id,
        String accessCode,
        String eventName,
        LocalDate eventDate,
        LocalDateTime createdAt
) {
    public static GuestSessionDTO fromEntity(GuestSession gs){
        return new GuestSessionDTO(
                gs.getId().toString(),
                gs.getEvent().getAccessCode(),
                gs.getEvent().getName(),
                gs.getEvent().getDate(),
                gs.getDateTime()
        );
    }
}
