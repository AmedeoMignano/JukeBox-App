package amedeo.mignano.jukebox_app.payloads.error;

import java.time.LocalDateTime;

public record ErrorsDTO(String message, LocalDateTime timeStamp) {
}
