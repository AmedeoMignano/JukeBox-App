package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.Phase;

public record EventUpdatePhaseResponseDTO(
        Long id,
        Phase phase
) {
    public static EventUpdatePhaseResponseDTO fromEntity(Event event){
        return new EventUpdatePhaseResponseDTO(
                event.getId(),
                event.getCurrentPhase()
        );
    }
}
