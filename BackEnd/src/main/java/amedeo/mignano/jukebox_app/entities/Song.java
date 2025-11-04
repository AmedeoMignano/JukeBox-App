package amedeo.mignano.jukebox_app.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "songs")
@NoArgsConstructor
@Getter
@Setter
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name = "song_id")
    private Long id;
    private String title;
    private String artist;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    private boolean active = true;
}
