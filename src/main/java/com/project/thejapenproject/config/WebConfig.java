package com.project.thejapenproject.config;

import com.project.thejapenproject.common.interceptor.AuthHandlerInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
@CrossOrigin
public class WebConfig implements WebMvcConfigurer{
    private final AuthHandlerInterceptor authHandlerInterceptor;

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/icon-image/**")
                .addResourceLocations("file:/opt/thejapan/user/icon/"); // 실제 파일 저장 경로
    }

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://lg.thejapan.today", "https://lg.thejapan.today:443",
                        "https://lg.thejapan.today:8889")
                .allowCredentials(true)
                .allowedHeaders("*")
                .exposedHeaders("*")
                .maxAge(3000)
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","));
    }



    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authHandlerInterceptor)
                .excludePathPatterns(
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/webjars/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/swagger-config",
                        "/signUp",
                        "/signIn",
                        "/error/**",
                        "/reissue",
                        "/u300qubitonzbqlxmdhstjdudtjr/**"
                )
                .addPathPatterns("/**");
    }
}
