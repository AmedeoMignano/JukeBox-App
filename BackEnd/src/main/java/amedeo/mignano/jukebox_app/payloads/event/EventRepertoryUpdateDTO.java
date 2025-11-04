package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Song;

import java.util.List;

public record EventRepertoryUpdateDTO(
        List<Long> addSongsIds,
        List<Long> removeSongsIds
) {
}
