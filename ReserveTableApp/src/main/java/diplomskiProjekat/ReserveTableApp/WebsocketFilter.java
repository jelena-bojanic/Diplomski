package diplomskiProjekat.ReserveTableApp;

import diplomskiProjekat.ReserveTableApp.security.TokenUtils;
import diplomskiProjekat.ReserveTableApp.security.auth.TokenBasedAuthentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WebsocketFilter  extends OncePerRequestFilter {

    private TokenUtils tokenUtils;

    private UserDetailsService userDetailsService;

    public WebsocketFilter(){}

    public WebsocketFilter(TokenUtils tokenUtils, UserDetailsService userDetailsService) {
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            String email;
            String authToken = request.getQueryString().substring(12,request.getQueryString().length());

            response.setHeader("Authorization","Bearer"+authToken);
            filterChain.doFilter(request, response);

    }
}
