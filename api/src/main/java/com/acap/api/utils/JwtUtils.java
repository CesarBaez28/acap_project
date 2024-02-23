package com.acap.api.utils;

import java.util.Date;
import java.util.function.Function;
import java.util.logging.Logger;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.time.expiration}")
  private String timeExpiration;

  // Generate token
  public String generateAcessToken(String username) {
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
        .signWith(getSignatureKey(), Jwts.SIG.HS256)
        .compact();
  }

  // Get signature key
  public SecretKey getSignatureKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  // Validate token
  public boolean isTokenValid(String token) {
    try {
      Jwts.parser()
          .verifyWith(getSignatureKey())
          .build()
          .parseSignedClaims(token)
          .getPayload();

      return true;
    } catch (Exception e) {
      Logger logger = Logger.getLogger(getClass().getName());
      logger.info("Token inválido: " + e.getMessage());
      return false;
    }  
  }

  // get username token 
  public String getUsernameFromToken (String token) {
    return getClaim(token, Claims::getSubject);
  }

  // Get just one claim
  public <T> T getClaim (String token, Function<Claims, T> claimsFunction) {
    Claims claims = extractAllClaims(token);
    return claimsFunction.apply(claims);
  }

  // Get all claims
  public Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(getSignatureKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

}
