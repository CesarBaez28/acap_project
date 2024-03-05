package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Folders;
import com.acap.api.repository.FoldersRepository;

/**
 * Servicio para la gestión de carpetas en el sistema.
 * Proporciona métodos para guardar y recuperar carpetas en la base de datos.
 */
@Service
public class FoldersService {

  private final FoldersRepository foldersRepository;

  /**
   * Constructor que inyecta el repositorio necesario para el servicio.
   *
   * @param foldersRepository Repositorio de carpetas.
   */
  public FoldersService(FoldersRepository foldersRepository) {
    this.foldersRepository = foldersRepository;
  }

  /**
   * Guarda una carpeta en el sistema.
   *
   * @param folder Carpeta que se va a guardar.
   * @return Carpeta guardada en la base de datos.
   */
  @SuppressWarnings("null")
  public Folders saveFolder(Folders folder) {
    return foldersRepository.save(folder);
  }

  /**
   * Recupera todas las carpetas almacenadas en el sistema.
   *
   * @return Lista de todas las carpetas en el sistema.
   */
  public List<Folders> findAll() {
    return foldersRepository.findAll();
  }
}

