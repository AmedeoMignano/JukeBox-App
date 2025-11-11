package amedeo.mignano.jukebox_app.payloads.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RequestCreateDTO(
        @NotNull(message = "L'ID della sessione dell'ospite è obbligatorio")
        UUID guestId,
        @NotNull(message = "L'ID del brano è obbligatorio")
        Long songId,
        String guestName


) {
}
