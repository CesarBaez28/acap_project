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

@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> messageConverters) {
    messageConverters.add(createImageHttpMessageConverter());
    messageConverters.add(byteArrayHttpMessageConverter());
    messageConverters.add(new MappingJackson2HttpMessageConverter());
  }

  @Bean
  public HttpMessageConverter<BufferedImage> createImageHttpMessageConverter() {
    return new BufferedImageHttpMessageConverter();
  }

  @Bean
  public ByteArrayHttpMessageConverter byteArrayHttpMessageConverter() {
    return new ByteArrayHttpMessageConverter();
  }
}
