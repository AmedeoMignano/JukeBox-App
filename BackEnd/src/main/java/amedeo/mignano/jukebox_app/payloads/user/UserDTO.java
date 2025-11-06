package amedeo.mignano.jukebox_app.payloads.user;

import jakarta.validation.constraints.*;

public record UserDTO(
        @NotBlank(message = "L'username è obbligatorio")
        @Size(min = 2, max = 20, message = "Il nome deve avere una grandezza compresa tra 2 e 20 caratteri")
        String username,
        @NotBlank(message = "L'indirizzo e-mail non può essere vuoto")
        @Email(message = "Indirizzo e-mail inserito nel formato sbagliato")
        @Pattern(regexp = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Z|a-z]{2,}\\b", message = "Inserisci indirizzo e-mail valido")
        String email,
        @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", message = "La password deve contenere da 8 a 16 caratteri, un numero, almeno una minuscola e una maiuscola")
        String password
) {
}
