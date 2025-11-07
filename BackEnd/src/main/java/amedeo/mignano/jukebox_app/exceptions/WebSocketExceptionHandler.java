package amedeo.mignano.jukebox_app.exceptions;

import amedeo.mignano.jukebox_app.payloads.error.ErrorsDTO;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.time.LocalDateTime;

@ControllerAdvice
public class WebSocketExceptionHandler {

    @MessageExceptionHandler(IllegalArgumentException.class)
    @SendToUser("/queue/errors")
    public ErrorsDTO handleIllegalArgument(IllegalArgumentException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
    @MessageExceptionHandler(IllegalStateException.class)
    @SendToUser("/queue/errors")
    public ErrorsDTO handleIllegalState(IllegalStateException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
    @MessageExceptionHandler(NotFoundException.class)
    @SendToUser("/queue/errors")
    public ErrorsDTO handleIllegal(NotFoundException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
}
