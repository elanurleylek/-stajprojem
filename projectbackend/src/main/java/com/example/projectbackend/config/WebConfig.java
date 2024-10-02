package com.example.projectbackend.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Tüm API istekleri için izin ver
                .allowedOrigins("http://localhost:3000") // React uygulamanızın adresi
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP metotları
                .allowedHeaders("*") // Tüm başlıklara izin ver
                .allowCredentials(true); // Kimlik doğrulama bilgileri ile çalış
    }
}
