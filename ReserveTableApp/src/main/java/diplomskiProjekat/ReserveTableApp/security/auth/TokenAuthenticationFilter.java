package diplomskiProjekat.ReserveTableApp.security.auth;

import diplomskiProjekat.ReserveTableApp.security.TokenUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private TokenUtils tokenUtils;

    private UserDetailsService userDetailsService;

    public TokenAuthenticationFilter(TokenUtils tokenHelper, UserDetailsService userDetailsService) {
        this.tokenUtils = tokenHelper;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String email;
        String authToken = tokenUtils.getToken(request);

        if(authToken != null){
            email = tokenUtils.getEmailFromToken(authToken);

            if(email != null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                if (tokenUtils.validateToken(authToken, userDetails)) {
                    // kreiraj autentifikaciju
                    TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
                    authentication.setToken(authToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        else if(request.getQueryString() != null && request.getQueryString().contains("accessToken")){
            String authTokenVersion2 = request.getParameterMap().get("accessToken")[0];
            if(authTokenVersion2 != null){
                email = tokenUtils.getEmailFromToken(authTokenVersion2);

                if(email != null){
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    if (tokenUtils.validateToken(authTokenVersion2, userDetails)) {
                        // kreiraj autentifikaciju
                        TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
                        authentication.setToken(authTokenVersion2);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
