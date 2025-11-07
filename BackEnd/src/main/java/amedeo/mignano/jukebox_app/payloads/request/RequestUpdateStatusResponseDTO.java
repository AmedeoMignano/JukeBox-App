package amedeo.mignano.jukebox_app.payloads.request;

import amedeo.mignano.jukebox_app.entities.Request;

public record RequestUpdateStatusResponseDTO(
        String songName,
        String status
) {
    public static RequestUpdateStatusResponseDTO fromEntity(Request req){
        return new RequestUpdateStatusResponseDTO(
                req.getSong().getTitle(),
                req.getStatus().name()
        );
    }
}
