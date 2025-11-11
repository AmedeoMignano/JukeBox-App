package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;

import java.util.List;

public record EventAddSongsToRepertoryDTO(
        List<Long> songsId
) {
}
