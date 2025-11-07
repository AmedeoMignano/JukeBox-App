package amedeo.mignano.jukebox_app.payloads.request;

import amedeo.mignano.jukebox_app.entities.Request;

public record RequestResponseDTO(
        Long id,
        String guestName,
        String songTitle,
        String eventCode,
        String status
) {
    public static RequestResponseDTO fromEntity(Request req) {
        return new RequestResponseDTO(
                req.getId(),
                req.getGuestName(),
                req.getSong().getTitle(),
                req.getEvent().getAccessCode(),
                req.getStatus().name()
        );
    }
}