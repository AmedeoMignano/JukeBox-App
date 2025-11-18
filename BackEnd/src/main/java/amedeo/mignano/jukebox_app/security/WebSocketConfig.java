package amedeo.mignano.jukebox_app.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/ws").
               setAllowedOrigins(  "http://localhost:5174",
                       "http://localhost:5173",
                       "http://127.0.0.1:5500",
                       "https://rich-sheelagh-amedeomignano-0e8df352.koyeb.app",
                       "https://banda-corta-jukebox.vercel.app",
                       "https://juke-box-app-nine.vercel.app").
               withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
       registry.enableSimpleBroker("/topic", "/queue");
       registry.setApplicationDestinationPrefixes("/app");
       registry.setUserDestinationPrefix("/user");
    }
}
