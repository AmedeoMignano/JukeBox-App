package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.request.RequestCreateDTO;
import amedeo.mignano.jukebox_app.payloads.request.RequestUpdateStatusDTO;
import amedeo.mignano.jukebox_app.services.RequestsService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RequestWebSocketController {

    private RequestsService requestsService;
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/requests/create")
    public void HandleRequest(@Validated RequestCreateDTO body,
                              BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().stream().
                    map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        var saved = requestsService.createRequest(body);
        simpMessagingTemplate.convertAndSend("topic/event" + saved.getEvent().getAccessCode() + "/requests", saved);
    }

    public void handleUpdateStatus(RequestUpdateStatusDTO body){
        var updated = requestsService.updateStatus(body.id(), body);
        simpMessagingTemplate.convertAndSend("topic/event" + updated.getEvent().getAccessCode() + "/requests", updated);
    }
}
