package com.acap.api.config;

import java.awt.image.BufferedImage;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * Clase para configurar convertidores de mensajes http
 */
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

  // Método para configurar convertidores de mensajes HTTP
  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
    // Agregar convertidor de mensajes para imágenes
    messageConverters.add(createImageHttpMessageConverter());
    // Agregar convertidor de mensajes para matrices de bytes
    messageConverters.add(byteArrayHttpMessageConverter());
    // Agregar convertidor de mensajes JSON usando Jackson
    messageConverters.add(new MappingJackson2HttpMessageConverter());
  }

  // Bean para crear un convertidor de mensajes para BufferedImage
  @Bean
  public HttpMessageConverter<BufferedImage> createImageHttpMessageConverter() {
    return new BufferedImageHttpMessageConverter();
  }

  // Bean para crear un convertidor de mensajes para matrices de bytes
  @Bean
  public ByteArrayHttpMessageConverter byteArrayHttpMessageConverter() {
    return new ByteArrayHttpMessageConverter();
  }
}
