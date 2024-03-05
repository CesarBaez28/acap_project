package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Folders;

/**
 * Interfaz de repositorio para la entidad Folders.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface FoldersRepository extends JpaRepository<Folders, Long> {
  
}

