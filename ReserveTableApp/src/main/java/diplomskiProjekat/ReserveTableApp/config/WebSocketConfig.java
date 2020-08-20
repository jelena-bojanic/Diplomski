package diplomskiProjekat.ReserveTableApp.config;


import diplomskiProjekat.ReserveTableApp.websocket.SocketSession;
import diplomskiProjekat.ReserveTableApp.websocket.UserInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.session.ExpiringSession;
import org.springframework.session.Session;
import org.springframework.session.web.socket.config.annotation.AbstractSessionWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;


@Configuration
@EnableWebSocketMessageBroker
@EnableScheduling
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.setInterceptors(new UserInterceptor());
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/socket-subscriber") // Prefiks koji koji se koristi za mapiranje svih poruka.
                // Klijenti moraju da ga navedu kada salju poruku serveru.
                // Svaki URL bi pocinjao ovako: http://localhost:8080/socket-subscriber/…/…
                .enableSimpleBroker("/socket-publisher");

        // Definisanje topic-a (ruta) na koje klijenti mogu da se pretplate.
        // SimpleBroker cuva poruke u memoriji i salje ih klijentima na definisane topic-e.
        // Server kada salje poruke, salje ih na rute koje su ovde definisane, a klijenti cekaju na poruke.
        // Vise ruta odvajamo zarezom, npr. enableSimpleBroker("/ruta1", "/ruta2");
    }
}