package amedeo.mignano.jukebox_app.services;

import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.exceptions.UnauthorizedException;
import amedeo.mignano.jukebox_app.payloads.user.LoginDTO;
import amedeo.mignano.jukebox_app.security.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsersService usersService;
    @Autowired
    private JwtTools jwtTools;
    @Autowired
    private PasswordEncoder bcrypt;

    public String checkCredentialsAndGenerateToken(LoginDTO payload){
        User found = usersService.findByEmail(payload.email());
        if(bcrypt.matches(payload.password(), found.getPassword())){
            return jwtTools.createToken(found);
        }else {
            throw new UnauthorizedException("Credenziali errate!");
        }
    }
}
