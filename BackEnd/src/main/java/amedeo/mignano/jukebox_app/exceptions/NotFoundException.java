package amedeo.mignano.jukebox_app.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
    public NotFoundException(Long id){super("Risorsa con id: " + id + " non trovata");}
}
