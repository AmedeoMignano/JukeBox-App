package amedeo.mignano.jukebox_app.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "guest_sessions")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class GuestSession {
    @Id
    @GeneratedValue
    @Column(name = "guest_session_id")
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    @JsonIgnore
    private Event event;
    @Column(name = "created_at")
    private LocalDateTime dateTime = LocalDateTime.now();

    public GuestSession(Event event) {
        this.event = event;
        this.dateTime = LocalDateTime.now();
    }


}
