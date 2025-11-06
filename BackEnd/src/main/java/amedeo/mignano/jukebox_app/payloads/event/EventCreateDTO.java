package amedeo.mignano.jukebox_app.payloads.event;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record EventCreateDTO(
        @NotBlank(message = "Il nome dell'evento non può essere vuoto")
        String name,
        @NotBlank(message = "Il nome della location non può essere vuoto")
        String location,
        @FutureOrPresent(message = "La data dell'evento deve esssere nel presente o nel futuro")
        @NotNull(message = "Il campo data non può essere vuoto")
        LocalDate date,
        @NotNull(message = "Il campo per verificare se l'evento è attivo non può essere vuoto")
        boolean active,
        List<Long> songsId
) {
}
