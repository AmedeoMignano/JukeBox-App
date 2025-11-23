package amedeo.mignano.jukebox_app.controllers;

import amedeo.mignano.jukebox_app.exceptions.NotValidException;
import amedeo.mignano.jukebox_app.payloads.user.LoginDTO;
import amedeo.mignano.jukebox_app.payloads.user.LoginResponseDTO;
import amedeo.mignano.jukebox_app.services.AuthService;
import amedeo.mignano.jukebox_app.services.UsersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
public class AuthController {
    @Autowired
    private UsersService usersService;
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(
            description = "Login",
            summary = "This endpoint is used to login"
    )
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResponseDTO login(@RequestBody @Validated LoginDTO body, BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errorMessages = validationResult.getFieldErrors().
                    stream().map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage()).toList();
            throw new NotValidException(errorMessages);
        }
        return new LoginResponseDTO(authService.checkCredentialsAndGenerateToken(body));
    }
}
