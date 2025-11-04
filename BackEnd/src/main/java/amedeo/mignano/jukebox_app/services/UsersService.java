package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public User findById(Long id){
        return usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }
    public User findByEmail(String email){
        return usersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }
}
