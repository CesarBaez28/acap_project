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

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  User findByUsername(String username);

  User findByEmployeeNumber(String employeeNumber);

  Optional<User> findById(UUID id);

  @Query("SELECT u FROM User u " +
      "JOIN u.position p " +
      "WHERE u.status = :status AND u.id != :userId")
  List<User> findByStatus(@Param("status") boolean status, @Param("userId") UUID userId);

  @Query("SELECT u FROM User u " +
      "JOIN u.position p " +
      "WHERE (u.username LIKE %:search% " +
      "OR u.employeeNumber LIKE %:search% " +
      "OR p.position LIKE %:search%) " +
      "AND u.status = true AND u.id != :userId")
  List<User> search(@Param("search") String search, @Param("userId") UUID userId);

  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.status = :state WHERE u.id = :id")
  void updateStatus(@Param("id") UUID id, @Param("state") boolean state);

  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.password = :password WHERE u.id = :id")
  void changePassword(@Param("id") UUID id, @Param("password") String password);
}
