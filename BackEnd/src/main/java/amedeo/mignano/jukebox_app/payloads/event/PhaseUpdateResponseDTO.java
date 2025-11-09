package amedeo.mignano.jukebox_app.payloads.event;

import amedeo.mignano.jukebox_app.entities.Phase;
import amedeo.mignano.jukebox_app.payloads.song.SongReqDTO;
import java.util.List;

public record PhaseUpdateResponseDTO(
        Phase phase,
        List<SongReqDTO> songs
) {}