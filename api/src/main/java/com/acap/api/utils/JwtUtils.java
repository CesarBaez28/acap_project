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

/**
 * Clase utilitaria para la gestión de tokens JWT (JSON Web Token).
 */
@Component
public class JwtUtils {

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.time.expiration}")
  private String timeExpiration;

  /**
   * Genera un token de acceso JWT para el usuario especificado.
   *
   * @param username Nombre de usuario para el que se genera el token.
   * @return Token JWT generado.
   */
  public String generateAcessToken(String username) {
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
        .signWith(getSignatureKey(), Jwts.SIG.HS256)
        .compact();
  }

  /**
   * Obtiene la clave de firma para la generación de tokens.
   *
   * @return Clave secreta para firmar los tokens.
   */
  public SecretKey getSignatureKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  /**
   * Valida la autenticidad y vigencia de un token JWT.
   *
   * @param token Token JWT a validar.
   * @return true si el token es válido, false de lo contrario.
   */
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

  /**
   * Obtiene la fecha de vencimiento de un token JWT.
   *
   * @param token Token JWT del que se obtendrá la fecha de vencimiento.
   * @return Fecha de vencimiento del token.
   */
  public Date getExpirationDateFromToken(String token) {
    return getClaim(token, Claims::getExpiration);
  }

  /**
   * Obtiene el nombre de usuario asociado a un token JWT.
   *
   * @param token Token JWT del que se obtendrá el nombre de usuario.
   * @return Nombre de usuario asociado al token.
   */
  public String getUsernameFromToken(String token) {
    return getClaim(token, Claims::getSubject);
  }

  /**
   * Obtiene un reclamo específico de un token JWT.
   *
   * @param token          Token JWT del que se obtendrá el reclamo.
   * @param claimsFunction Función que especifica el reclamo a obtener.
   * @param <T>            Tipo de datos del reclamo.
   * @return Reclamo específico del token.
   */
  public <T> T getClaim(String token, Function<Claims, T> claimsFunction) {
    Claims claims = extractAllClaims(token);
    return claimsFunction.apply(claims);
  }

  /**
   * Extrae todos los reclamos de un token JWT.
   *
   * @param token Token JWT del que se extraerán los reclamos.
   * @return Reclamos del token.
   */
  public Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(getSignatureKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

}
