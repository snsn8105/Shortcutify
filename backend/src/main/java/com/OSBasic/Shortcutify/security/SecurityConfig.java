package com.OSBasic.Shortcutify.security;

import com.OSBasic.Shortcutify.config.WebConfig;
import com.OSBasic.Shortcutify.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter; // 순환 참조 아님

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // 1. 템플릿 + API 비로그인 허용
                .requestMatchers(
                    "/", "/index", "/login", "/register", "/main",
                    "/favicon.ico", "/error",
                    "/api/users/signup", "/api/users/login",
                    "/api/icons/search",
                    "/icons/**" 
                ).permitAll()
                
                // 2. 정적 리소스 (favicon, .js, .css, images…) 전부 허용
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
    
                // 3. 토큰 있어야 접근
                .requestMatchers(
                    "/api/users/me",
                    "/api/shortcuts/**",
                    "/api/icons/upload",
                    "/api/icons/url-upload",
                    "/api/icons/upload-png"
                ).authenticated()
    
                // 4. 그 외 모두 차단
                .anyRequest().denyAll()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebConfig();
    }

}