package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.payloads.guestsession.GuestSessionDTO;
import amedeo.mignano.jukebox_app.services.GuestSessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guest-session")
public class GuestSessionController {
    @Autowired
    private GuestSessionsService guestSessionsService;

    @GetMapping
    public GuestSessionDTO getActiveSession(){
        return guestSessionsService.checkEventAndCreateSession();
    }
}
