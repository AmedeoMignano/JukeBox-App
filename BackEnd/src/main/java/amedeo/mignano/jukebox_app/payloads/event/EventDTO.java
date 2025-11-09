package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.entities.Phase;
import amedeo.mignano.jukebox_app.entities.Request;
import amedeo.mignano.jukebox_app.payloads.guestsession.GuestSessionDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestResponseDTO;

import java.util.List;

public record EventDTO(
        Long id,
        String name,
        String accessCode,
        String location,
        Phase phase,
        List<RequestResponseDTO> requests,
        List<GuestSessionDTO> guests
) {
    public static EventDTO fromEntity(Event ev){
        return new EventDTO(
                ev.getId(),
                ev.getName(),
                ev.getAccessCode(),
                ev.getLocation(),
                ev.getCurrentPhase(),
                ev.getRequests() != null ?
                        ev.getRequests().stream().map(RequestResponseDTO::fromEntity).toList()
                        : List.of(),
                ev.getGuests() != null ?
                        ev.getGuests().stream().map(GuestSessionDTO::fromEntity).toList()
                        : List.of()

        );
    }
}
