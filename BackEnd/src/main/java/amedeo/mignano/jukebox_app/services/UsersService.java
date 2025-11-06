package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.Role;
import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.BadRequestException;
import amedeo.mignano.jukebox_app.exceptions.NotFoundException;
import amedeo.mignano.jukebox_app.exceptions.UnauthorizedException;
import amedeo.mignano.jukebox_app.payloads.user.UserDTO;
import amedeo.mignano.jukebox_app.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PasswordEncoder bcrypt;

    public User findById(Long id){
        return usersRepository.findById(id).orElseThrow(() -> new NotFoundException("Utente non trovato"));
    }
    public User findByEmail(String email){
        return usersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Email non trovata"));
    }
    public User createUser(UserDTO payload){
        usersRepository.findByEmail(payload.email()).ifPresent(user -> {
            throw new BadRequestException("Email " + payload.email() + " già in uso");
        });
        usersRepository.findByUsername(payload.username()).ifPresent(utente -> {
            throw new BadRequestException("Username " + payload.username() + " già in uso");
        });
        User user = new User();
        user.setUsername(payload.username());
        user.setPassword(bcrypt.encode(payload.password()));
        user.setEmail(payload.email());
        user.setRole(Role.valueOf("ADMIN"));
        var saved = usersRepository.save(user);
        log.info("Utente " + saved.getUsername() + " salvato correttamente");
        return saved;
    }
    public User findByIdAndUpdate(Long id, UserDTO payload){
        User found = this.findById(id);
        if(!found.getEmail().equals(payload.email())){
            usersRepository.findByEmail(payload.email()).ifPresent(user -> {
                throw new BadRequestException("Email " + payload.email() + " già in uso");
            });
        }
        if(!found.getUsername().equals(payload.username())){
            usersRepository.findByUsername(payload.username()).ifPresent(utente -> {
                throw new BadRequestException("Username " + payload.username() + " già in uso");
            });
        }
        found.setUsername(payload.username());
        found.setEmail(payload.email());
        found.setPassword(payload.password());
        var updated = usersRepository.save(found);
        log.info("Utente " + updated.getUsername() + " aggiornato correttamente");
        return updated;
    }
    public void delete(Long id){
        User found = this.findById(id);
        usersRepository.delete(found);
    }
}
