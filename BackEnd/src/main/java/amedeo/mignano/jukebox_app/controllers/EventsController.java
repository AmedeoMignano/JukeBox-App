package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.event.*;
import amedeo.mignano.jukebox_app.services.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventsController {
    @Autowired
    private EventsService eventsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Event createEvent(@RequestBody @Validated EventCreateDTO body,
                             @AuthenticationPrincipal User authenticated,
                             BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().stream().
                    map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        return eventsService.createEvent(body, authenticated);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<EventsDTO> getAllEvents(){
        return eventsService.getAll().stream().
                map(EventsDTO::fromEntity).toList();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public EventDTO getSingle(@PathVariable Long id){
        Event ev = eventsService.findById(id);
        return EventDTO.fromEntity(ev);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Event updateEvent(@RequestBody @Validated EventUpdateBasicDTO body,
                                           @PathVariable Long id,
                                           BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().stream().
                    map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        return eventsService.findByIdAndUpdateBasic(id,body);
    }
    @PutMapping("/repertory/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Event updateRepertory(@PathVariable Long id,
                                 @RequestBody EventRepertoryUpdateDTO body){
        return eventsService.updateRepertory(id,body);
    }
    @PutMapping("/repertory/song/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public EventDTO addSongsToRepertory(@PathVariable Long id, @RequestBody EventAddSongsToRepertoryDTO body){
        Event ev = eventsService.addSongToRepertory(id,body);
        return EventDTO.fromEntity(ev);
    }



    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        eventsService.delete(id);
    }

    @DeleteMapping("/repertory/song/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSongFromRepertory(@PathVariable Long id, @RequestBody EventDeleteSongFromRepertoryDTO body){
        eventsService.deleteSongFromRepertory(id,body);
    }
    @GetMapping("/active")
    public EventDTO getActiveEvent(){
       Event ev = eventsService.findActive();
       return EventDTO.fromEntity(ev);
    }
}
