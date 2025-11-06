package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.entities.Song;
import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.song.SongDTO;
import amedeo.mignano.jukebox_app.services.SongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongsController {
    @Autowired
    private SongsService songsService;

    @PostMapping()
    @PreAuthorize("hasAuthority('ADMIN')")
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Song> findAll(){
        return songsService.findAll();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Song findById(@PathVariable Long id){
        return songsService.findById(id);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        songsService.delete(id);
    }
}
