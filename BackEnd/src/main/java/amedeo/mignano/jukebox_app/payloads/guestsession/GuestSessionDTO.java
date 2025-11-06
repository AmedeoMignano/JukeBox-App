package amedeo.mignano.jukebox_app.payloads.guestsession;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GuestSessionDTO(
        String id,
        String accessCode,
        String eventName,
        LocalDate eventDate,
        LocalDateTime createdAt
) {
}
