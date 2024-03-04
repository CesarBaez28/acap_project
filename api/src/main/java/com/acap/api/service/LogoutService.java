package com.acap.api.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.acap.api.repository.UserTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler{

  private final UserTokenRepository userTokenRepository;

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
   final String tokenHeader = request.getHeader("Authorization");
   final String jwt;

   if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) { return; }
   jwt = tokenHeader.substring(7);

   var storedToken = userTokenRepository.findByToken(jwt).orElse(null);

   if (storedToken != null) {
    storedToken.setRevoked(true);
    userTokenRepository.save(storedToken);
   } 

  }
}
