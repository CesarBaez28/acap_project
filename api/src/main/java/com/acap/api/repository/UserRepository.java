package com.acap.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.User;

import jakarta.transaction.Transactional;

/**
 * Interfaz de repositorio para la entidad User.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  /**
   * Encuentra un usuario por nombre de usuario.
   *
   * @param username Nombre de usuario.
   * @return El usuario encontrado, o null si no hay coincidencia.
   */
  User findByUsername(String username);

  /**
   * Encuentra un usuario por número de empleado.
   *
   * @param employeeNumber Número de empleado.
   * @return El usuario encontrado, o null si no hay coincidencia.
   */
  User findByEmployeeNumber(String employeeNumber);

  /**
   * Encuentra un usuario por su identificador único.
   *
   * @param id Identificador único del usuario.
   * @return Un Optional que contiene el usuario encontrado o está vacío si no hay coincidencia.
   */
  Optional<User> findById(UUID id);

  /**
   * Obtiene una lista de usuarios filtrados por estado y excluyendo un usuario específico.
   *
   * @param status Estado del usuario.
   * @param userId Identificador único del usuario a excluir.
   * @return Lista de usuarios que cumplen con los criterios.
   */
  @Query("SELECT u FROM User u " +
      "JOIN u.position p " +
      "WHERE u.status = :status AND u.id != :userId")
  List<User> findByStatus(@Param("status") boolean status, @Param("userId") UUID userId);

  /**
   * Busca usuarios por un término de búsqueda y excluyendo un usuario específico.
   *
   * @param search Término de búsqueda.
   * @param userId Identificador único del usuario a excluir.
   * @return Lista de usuarios que cumplen con los criterios de búsqueda.
   */
  @Query("SELECT u FROM User u " +
      "JOIN u.position p " +
      "WHERE (u.username LIKE %:search% " +
      "OR u.employeeNumber LIKE %:search% " +
      "OR p.position LIKE %:search%) " +
      "AND u.status = true AND u.id != :userId")
  List<User> search(@Param("search") String search, @Param("userId") UUID userId);

  /**
   * Actualiza el estado de un usuario.
   *
   * @param id    Identificador único del usuario.
   * @param state Nuevo estado del usuario.
   */
  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.status = :state WHERE u.id = :id")
  void updateStatus(@Param("id") UUID id, @Param("state") boolean state);

  /**
   * Cambia la contraseña de un usuario.
   *
   * @param id       Identificador único del usuario.
   * @param password Nueva contraseña del usuario.
   */
  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.password = :password WHERE u.id = :id")
  void changePassword(@Param("id") UUID id, @Param("password") String password);
}

