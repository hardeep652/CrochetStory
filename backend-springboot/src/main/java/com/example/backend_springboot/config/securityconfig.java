package com.example.backend_springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class securityconfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers(
                    "/api/products/getproducts/others",
                    "/api/products/getproducts/home-decor",
                    "/api/products/getproducts/hair-accessories",
                    "/api/products/getproducts/gift-articles",
                    "/api/contact/sendinquiry",
                    "/api/register", // Updated to match your controller mapping
                    "/api/login" ,
                    "/api/inquiry/submit"
                ).permitAll()
                // Secured endpoints
                .requestMatchers(
                    "/api/order/**",
                    "/api/cart/**",
                    "/api/checkout/**",
                    "/api/products/admin/addproduct"
                ).authenticated()
                .anyRequest().authenticated()
            )
            .httpBasic(); // Can switch to JWT later

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("https://crochet-story-hiqp-pn2kl8srx-hardeep652s-projects.vercel.app")); // Frontend origin
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // Important for cookies/session/token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Applies to all endpoints
        return source;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}