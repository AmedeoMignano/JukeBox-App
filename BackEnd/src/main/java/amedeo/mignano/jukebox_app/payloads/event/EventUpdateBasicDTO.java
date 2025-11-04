package amedeo.mignano.jukebox_app.payloads.event;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EventUpdateBasicDTO(
        @NotBlank(message = "Il nome non può essere vuoto")
        String name,
        @NotBlank(message = "La location non può essere vuota")
        String location,
        @FutureOrPresent(message = "La data dell'evento deve esssere nel presente o nel futuro")
        @NotNull(message = "Il campo data non può essere vuoto")
        LocalDate date,
        @NotBlank(message = "Il campo per verificare se l'evento è attivo non può essere vuoto")
        boolean active
) {
}
