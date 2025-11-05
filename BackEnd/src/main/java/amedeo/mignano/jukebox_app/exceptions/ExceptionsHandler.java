package amedeo.mignano.jukebox_app.exceptions;


import amedeo.mignano.jukebox_app.payloads.error.ErrorsDTO;
import amedeo.mignano.jukebox_app.payloads.error.ErrorsWithListDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionsHandler {
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorsDTO handleNotFoundException(NotFoundException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorsDTO handleIllegalState(IllegalStateException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
    @ExceptionHandler(NotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsWithListDTO handleNotValidException(NotValidException ex){
        return new ErrorsWithListDTO(ex.getMessage(), LocalDateTime.now(), ex.getErrorMessages());
    }
    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorsDTO handleForbidden(AuthorizationDeniedException ex){
        return new ErrorsDTO("Non hai i permessi per accedere", LocalDateTime.now());
    }
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorsDTO handleUnauthorized(UnauthorizedException ex){
        return new ErrorsDTO(ex.getMessage(), LocalDateTime.now());
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleHttp(BadRequestException ex){
        return new ErrorsDTO("Inserisci formato valido per Stato", LocalDateTime.now());}

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorsDTO handleIllegal(IllegalStateException ex){
        return new ErrorsDTO("Errore nell'inserimento ruolo", LocalDateTime.now());
    }
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorsDTO handleInternal(Exception ex){
        ex.printStackTrace();
        return new ErrorsDTO("Errore Nel Server", LocalDateTime.now());
    }

}

