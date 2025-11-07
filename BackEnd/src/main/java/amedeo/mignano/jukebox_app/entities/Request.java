package amedeo.mignano.jukebox_app.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@NoArgsConstructor
@Getter
@Setter
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Column(name = "request_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private GuestSession guest;
    @Column(name = "guest_name")
    private String guestName;
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;
    @Column(name = "request_datetime")
    private LocalDateTime createdAt = LocalDateTime.now();


}
