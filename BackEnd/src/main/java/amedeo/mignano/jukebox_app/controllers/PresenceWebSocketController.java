package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.GuestSession;
import amedeo.mignano.jukebox_app.services.GuestSessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class PresenceWebSocketController {
    @Autowired
    private GuestSessionsService guestSessionsService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/presence/join")
    public void guestJoin(String guestId){
        GuestSession session = guestSessionsService.findById(UUID.fromString(guestId));
        simpMessagingTemplate.convertAndSend("/topic/send/" + session.getEvent().getAccessCode() + "/presence",
                "Guest joined: " + session.getId());
    }

    @MessageMapping("/presence/leave")
    public void guestLeave(String guestId){
        GuestSession session = guestSessionsService.findById(UUID.fromString(guestId));
        simpMessagingTemplate.convertAndSend("/topic/send/" + session.getEvent().getAccessCode() + "/presence",
                "Guest leaved: " + session.getId());
    }
}
