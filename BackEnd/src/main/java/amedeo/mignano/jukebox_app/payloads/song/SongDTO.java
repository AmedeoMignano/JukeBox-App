package amedeo.mignano.jukebox_app.payloads.song;

import amedeo.mignano.jukebox_app.entities.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SongDTO(
        @NotBlank(message = "Titolo brano obbligatorio")
        String title,
        @NotBlank(message = "Artista brano obbligatorio")
        String artist,
        @NotNull(message = "La categoria non può essere vuota")
        Category category
) {
}
