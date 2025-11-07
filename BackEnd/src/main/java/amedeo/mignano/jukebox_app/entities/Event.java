package amedeo.mignano.jukebox_app.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name = "event_id")
    private Long id;
    private String name;
    private LocalDate date;
    private String location;
    private boolean active = false;
    @Column(name = "access_code", unique = true, nullable = false)
    private String accessCode;
    @Column(name = "current_phase", nullable = false)
    @Enumerated(EnumType.STRING)
    private Phase currentPhase;
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "event_songs",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "song_id")
    )
    private List<Song> repertory = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Request> requests = new ArrayList<>();
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<GuestSession> guests = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
}
