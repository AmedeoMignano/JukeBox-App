package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.Event;
import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.event.*;
import amedeo.mignano.jukebox_app.services.EventsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Events")
public class EventsController {
    @Autowired
    private EventsService eventsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(
            description = "Post Event",
            summary = "This endpoint is used to create new Event"
    )
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
    @Operation(
            description = "Get All Events",
            summary = "This endpoint is used to get all Events"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<EventsDTO> getAllEvents(){
        return eventsService.getAll().stream().
                map(EventsDTO::fromEntity).toList();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(
            description = "Get Event",
            summary = "This endpoint is used to get a single Event by id"
    )
    public EventDTO getSingle(@PathVariable Long id){
        Event ev = eventsService.findById(id);
        return EventDTO.fromEntity(ev);
    }

    @PutMapping("{id}")
    @Operation(
            description = "Put Event",
            summary = "This endpoint is used to update an Event"
    )
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
    @Operation(
            description = "Put Event",
            summary = "This endpoint is used to update the Event's repertory"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    public Event updateRepertory(@PathVariable Long id,
                                 @RequestBody EventRepertoryUpdateDTO body){
        return eventsService.updateRepertory(id,body);
    }
    @PutMapping("/repertory/song/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(
            description = "Put Event",
            summary = "This endpoint is used to add songs to Event's repertory"
    )
    public EventDTO addSongsToRepertory(@PathVariable Long id, @RequestBody EventAddSongsToRepertoryDTO body){
        Event ev = eventsService.addSongToRepertory(id,body);
        return EventDTO.fromEntity(ev);
    }



    @DeleteMapping("{id}")
    @Operation(
            description = "Delete Event",
            summary = "This endpoint is used to delete an Event"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        eventsService.delete(id);
    }

    @DeleteMapping("/repertory/song/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(
            description = "Delete Event",
            summary = "This endpoint is used to delete a song from Event's repertory"
    )
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSongFromRepertory(@PathVariable Long id, @RequestBody EventDeleteSongFromRepertoryDTO body){
        eventsService.deleteSongFromRepertory(id,body);
    }
    @GetMapping("/active")
    @Operation(security = {},
    description = "Get active Event",
    summary = "This endpoint is used to get the active event")
    public EventDTO getActiveEvent(){
       Event ev = eventsService.findActive();
       return EventDTO.fromEntity(ev);
    }
    @Operation(security = {},
    description = "Get Event by access code",
    summary = "This endpoint is used to get an Event by its access code")
    @GetMapping("/event/{accessCode}")
    public EventDTO getActiveEventByAccessCode(@PathVariable String accessCode){
        Event ev = eventsService.findByAccessCode(accessCode);
        return EventDTO.fromEntity(ev);
    }
}
