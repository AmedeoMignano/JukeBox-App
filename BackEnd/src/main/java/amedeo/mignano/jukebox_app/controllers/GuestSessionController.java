package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.payloads.guestsession.GuestSessionDTO;
import amedeo.mignano.jukebox_app.services.GuestSessionsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guest-session")
@Tag(name = "Guest Session")
public class GuestSessionController {
    @Autowired
    private GuestSessionsService guestSessionsService;

    @GetMapping
    @Operation(
            description = "Get GuestSession",
            summary = "This endpoint is used to create new Guest Session"
    )
    public GuestSessionDTO getActiveSession(){
        return guestSessionsService.checkEventAndCreateSession();
    }
}
