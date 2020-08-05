package diplomskiProjekat.ReserveTableApp.config;

import diplomskiProjekat.ReserveTableApp.security.TokenUtils;
import diplomskiProjekat.ReserveTableApp.security.auth.RestAuthenticationEntryPoint;
import diplomskiProjekat.ReserveTableApp.security.auth.TokenAuthenticationFilter;
import diplomskiProjekat.ReserveTableApp.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private UserServiceImpl jwtUserService;

    // Neautorizovani pristup zastcenim resursima
    @Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // Implementacija PasswordEncoder-a koriscenjem BCrypt hashing funkcije.
    // BCrypt po defalt-u radi 10 rundi hesiranja prosledjene vrednosti.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Definisemo nacin autentifikacije
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
/*
		String password = passwordEncoder().encode("user");
        auth
            .inMemoryAuthentication()
            .withUser("user").password(password).authorities("ROLE_USER")
            .and()
            .withUser("user1").password(password).authorities("ROLE_USER", "ROLE_ADMIN");
*/

        auth.userDetailsService(jwtUserService).passwordEncoder(passwordEncoder());
    }



	/*
	 * .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			// za neautorizovane zahteve posalji 401 gresku
			.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
			.authorizeRequests()
			.antMatchers("/**").permitAll()
			// svaki zahtev mora biti autorizovan
			.anyRequest().authenticated().and()
			// presretni svaki zahtev filterom
			.addFilterBefore(new TokenAuthenticationFilter(tokenUtils, jwtUserDetailsService), BasicAuthenticationFilter.class);
			// komunikacija izmedju klijenta i servera je stateless
	 * */

    // Definisemo prava pristupa odredjenim URL-ovima
    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	//ovo je iz demo-a (komunikacija izmedju klijenta i servera je stateless)
                .and()
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint)
                .and()
                .authorizeRequests()

                .antMatchers("/").permitAll()
                .antMatchers("/auth/login").permitAll()
                .antMatchers("/auth/register").permitAll()
                .antMatchers("/api/users/getrole/**").permitAll()
                .antMatchers("/facility/all").permitAll()
                .antMatchers("/facility/one/{id}").permitAll()
                .antMatchers("/table/all-from-facility/{id}").permitAll()

                /*
                .antMatchers("/api/hotels").hasAnyRole("USER")
                .antMatchers("/api/users").hasAnyRole("USER", "SYSTEM_ADMIN")
                .antMatchers("/api/rentACars").hasAnyRole("SYSTEM_ADMIN")
                */

                .anyRequest().authenticated()
                .and()
                .cors().and()
                .addFilterBefore(new TokenAuthenticationFilter(tokenUtils, jwtUserService), BasicAuthenticationFilter.class);
			/*
			.and()
			.formLogin().loginPage("auth/login").permitAll()
			.and()
			.logout().permitAll();
			*/




        http.csrf().disable();
    }

    // Generalna bezbednost aplikacije
    @Override
    public void configure(WebSecurity web) {
        // TokenAuthenticationFilter ce ignorisati sve ispod navedene putanje
        web.ignoring().antMatchers("/");
        web.ignoring().antMatchers(HttpMethod.POST,"/auth/login");
        web.ignoring().antMatchers(HttpMethod.GET,"/facility/all");
        web.ignoring().antMatchers(HttpMethod.GET,"/facility/one/{id}");
        web.ignoring().antMatchers(HttpMethod.GET,"/table/all-from-facility/{id}");
        //i tako dalje na tu temu...
    }

}
