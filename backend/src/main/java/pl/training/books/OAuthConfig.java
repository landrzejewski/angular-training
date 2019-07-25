package pl.training.books;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.*;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import pl.training.books.user.UserService;

@Configuration
public class OAuthConfig {

  @EnableAuthorizationServer
  @Configuration
  public static class AuthorizationServer extends AuthorizationServerConfigurerAdapter {

    @Autowired
    @Setter
    UserService userService;
    @Autowired
    @Setter
    private TokenStore tokenStore;
    @Autowired
    @Setter
    private AuthenticationManager authenticationManagerBean;
    @Autowired
    @Setter
    private PasswordEncoder passwordEncoder;

    @Bean
    public TokenStore tokenStore() {
      return new InMemoryTokenStore();
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
      endpoints.tokenStore(tokenStore).authenticationManager(authenticationManagerBean)
        .userDetailsService(userService);
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
      security.allowFormAuthenticationForClients().passwordEncoder(passwordEncoder);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
      clients.inMemory()
        .withClient("books")
        .authorizedGrantTypes("password", "refresh_token")
        .scopes("public")
        .accessTokenValiditySeconds(10 * 60)
        .refreshTokenValiditySeconds(60 * 60);
    }

  }

  @EnableResourceServer
  @Configuration
  public static class ResourceServer extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
      http.authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/v1/users").permitAll()
        .antMatchers("/api/v1/**").hasRole("USER");
    }

  }

}

