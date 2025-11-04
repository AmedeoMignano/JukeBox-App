package amedeo.mignano.jukebox_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JukeboxAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(JukeboxAppApplication.class, args);
	}

}
