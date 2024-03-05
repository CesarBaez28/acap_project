package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.UserToken;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Interfaz de repositorio para la entidad UserToken.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

  /**
   * Busca tokens de usuario por el identificador único del usuario.
   *
   * @param userId Identificador único del usuario.
   * @return Lista de tokens de usuario no revocados asociados al usuario.
   */
  @Query("SELECT t FROM UserToken t " +
         "JOIN t.user u " +
         "WHERE u.id = :userId AND t.revoked = false")
  List<UserToken> findByUserId(@Param("userId") UUID userId);

  /**
   * Busca un token de usuario por el token.
   *
   * @param token Token de usuario.
   * @return Un Optional que contiene el token de usuario encontrado o está vacío si no hay coincidencia.
   */
  Optional<UserToken> findByToken(String token);
}

