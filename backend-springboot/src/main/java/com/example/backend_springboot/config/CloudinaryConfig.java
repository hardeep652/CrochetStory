package com.example.backend_springboot.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dbdyarkdq",
            "api_key", "913841718288688",
            "api_secret", "Ws1pwhMBOiVxX3-u7ueZa2hG3p0"
        ));
    }
}
