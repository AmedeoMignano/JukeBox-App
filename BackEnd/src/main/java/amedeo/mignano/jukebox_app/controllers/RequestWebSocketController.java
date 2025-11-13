package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.payloads.request.RequestCreateDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestResponseDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestUpdateStatusDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestUpdateStatusResponseDTO;
import amedeo.mignano.jukebox_app.services.RequestsService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Controller
public class RequestWebSocketController {
    @Autowired
    private RequestsService requestsService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/requests/create")
    public void HandleRequest(@Validated RequestCreateDTO body){
        var saved = requestsService.createRequest(body);
        var dto = RequestResponseDTO.fromEntity(saved);
        System.out.println("Inviando a /topic/event/" + dto.eventCode() + "/requests");
        simpMessagingTemplate.convertAndSend("/topic/event/" + dto.eventCode() + "/requests", dto);
    }

    @MessageMapping("/requests/update")
    public void handleUpdateStatus(RequestUpdateStatusDTO body){
        var updated = requestsService.updateStatus(body.id(), body);
        var dto = RequestUpdateStatusResponseDTO.fromEntity(updated);
        // punto di accesso generico
        simpMessagingTemplate.convertAndSend("/topic/event/" + updated.getEvent().getAccessCode() + "/requests", dto);
        // Creo un punto di accesso specifico per l'user che ha fatto la richiesta
        System.out.println("inviando risposta");
        simpMessagingTemplate.convertAndSend("/topic/event/" + updated.getEvent().getAccessCode() + "/requests/" + updated.getGuest().getId(), dto);
    }
}
