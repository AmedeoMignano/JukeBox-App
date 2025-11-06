package amedeo.mignano.jukebox_app.payloads.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record LoginDTO(
        @Email(message = "Indirizzo e-mail inserito nel formato sbagliato")
        @Pattern(regexp = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}\\b", message = "Inserisci indirizzo e-mail valido")
        String email,
        @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", message = "La password deve contenere da 8 a 16 caratteri, un numero, almeno una minuscola e una maiuscola")
        String password
) {
}
