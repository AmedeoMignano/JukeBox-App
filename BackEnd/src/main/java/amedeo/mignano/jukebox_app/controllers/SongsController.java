package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.Song;
import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.song.SongDTO;
import amedeo.mignano.jukebox_app.services.SongsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Songs")
public class SongsController {
    @Autowired
    private SongsService songsService;

    @PostMapping()
    @PreAuthorize("hasAuthority('ADMIN')")
    @Operation(
            description = "Post Song",
            summary = "This endpoint is used to create new Song"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public Song createSong(@RequestBody @Validated SongDTO body, BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().stream().
                    map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        return songsService.createSong(body);
    }

    @PutMapping("{id}")
    @Operation(
            description = "Put Song",
            summary = "This endpoint is used to update a Song"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    public Song updateSong(@PathVariable Long id,
                           @RequestBody @Validated SongDTO body,
                           BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().stream().
                    map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        return songsService.findByIdAndUpdate(id, body);
    }

    @GetMapping()
    @Operation(
            description = "Get all Songs",
            summary = "This endpoint is used to get all Songs"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Song> findAll(){
        return songsService.findAll();
    }

    @GetMapping("{id}")
    @Operation(
            description = "Get Song",
            summary = "This endpoint is used to get a Song by id"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    public Song findById(@PathVariable Long id){
        return songsService.findById(id);
    }

    @DeleteMapping("{id}")
    @Operation(
            description = "Delete Song",
            summary = "This endpoint is used to delete a Song"
    )
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        songsService.delete(id);
    }
}
