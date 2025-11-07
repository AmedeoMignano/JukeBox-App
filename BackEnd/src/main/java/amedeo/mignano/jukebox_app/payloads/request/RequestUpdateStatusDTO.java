package amedeo.mignano.jukebox_app.payloads.request;

import amedeo.mignano.jukebox_app.entities.Status;

public record RequestUpdateStatusDTO(
        Long id,
        Status status) {
}
