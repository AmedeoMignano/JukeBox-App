package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Phase;

public record EventUpdatePhaseDTO(
        Phase phase
) {
}
