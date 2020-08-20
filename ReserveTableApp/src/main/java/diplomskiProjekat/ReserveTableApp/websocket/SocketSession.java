package diplomskiProjekat.ReserveTableApp.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.session.ExpiringSession;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketExtension;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class SocketSession implements  ExpiringSession {

    private Principal principal;

    private String id;

    public  SocketSession(Principal p){
        this.principal = p;
    }

    public SocketSession(){}


    @Override
    public String getId() {
        return this.id;
    }

    @Override
    public <T> T getAttribute(String s) {
        return null;
    }

    @Override
    public Set<String> getAttributeNames() {
        return null;
    }

    @Override
    public void setAttribute(String s, Object o) {

    }

    @Override
    public void removeAttribute(String s) {

    }



    public void setPrincipal(Principal principal) {
        this.principal = principal;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public long getCreationTime() {
        return 0;
    }

    @Override
    public void setLastAccessedTime(long l) {

    }

    @Override
    public long getLastAccessedTime() {
        return 0;
    }

    @Override
    public void setMaxInactiveIntervalInSeconds(int i) {

    }

    @Override
    public int getMaxInactiveIntervalInSeconds() {
        return 0;
    }

    @Override
    public boolean isExpired() {
        return false;
    }
}
