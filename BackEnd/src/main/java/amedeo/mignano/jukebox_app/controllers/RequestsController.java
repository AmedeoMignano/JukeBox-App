package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.Request;
import amedeo.mignano.jukebox_app.payloads.request.RequestResponseDTO;
import amedeo.mignano.jukebox_app.services.RequestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestsController {
    @Autowired
    private RequestsService requestsService;

    @GetMapping("/pending/{accessCode}")
    public List<RequestResponseDTO> getAllPendingByAccessCode(@PathVariable String accessCode){
        return requestsService.getPendingByAccessCode(accessCode).stream().
                map(RequestResponseDTO::fromEntity).toList();

    }
}
