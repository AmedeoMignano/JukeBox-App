package amedeo.mignano.jukebox_app.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Amedeo",
                        email = "amedeo56@gmail.com"
                ),
                description = "OpenAPI documentation for JukeboxApp",
                title = "OpenAPI specs"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:3001"
                ),
                @Server(
                        description = "PROD ENV",
                        url = "https://rich-sheelagh-amedeomignano-0e8df352.koyeb.app/"
                )

        }
)
@SecurityScheme(
        name = "bearerAuth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
