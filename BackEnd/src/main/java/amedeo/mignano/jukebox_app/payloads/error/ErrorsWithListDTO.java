package amedeo.mignano.jukebox_app.payloads.error;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorsWithListDTO(String message, LocalDateTime timeStamp, List<String> errorMessages) {
}
