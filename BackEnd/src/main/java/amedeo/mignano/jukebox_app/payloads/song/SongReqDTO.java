package amedeo.mignano.jukebox_app.payloads.song;

import amedeo.mignano.jukebox_app.entities.Song;

public record SongReqDTO(
        Long songId,
        String title,
        String artist
) {
    public static SongReqDTO fromEntity(Song song){
        return new SongReqDTO(
                song.getId(),
                song.getTitle(),
                song.getArtist()
        );
    }
}
