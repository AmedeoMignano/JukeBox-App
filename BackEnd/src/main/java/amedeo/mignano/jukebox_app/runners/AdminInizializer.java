package amedeo.mignano.jukebox_app.runners;

import amedeo.mignano.jukebox_app.entities.Role;
import amedeo.mignano.jukebox_app.entities.User;
import amedeo.mignano.jukebox_app.repositories.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdminInizializer implements CommandLineRunner {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private PasswordEncoder bcrypt;
    @Value("${admin.email}")
    private String adminEmail;
    @Value("${admin.username}")
    private String adminUsername;
    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        if(usersRepository.findByEmail(adminEmail).isEmpty()){
            var user = new User();
            user.setPassword(bcrypt.encode(adminPassword));
            user.setEmail(adminEmail);
            user.setUsername(adminUsername);
            user.setRole(Role.valueOf("ADMIN"));
            var saved = usersRepository.save(user);
            log.info("Admin aggiunto");
        }
    }
}
