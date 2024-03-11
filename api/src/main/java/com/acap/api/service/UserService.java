package com.acap.api.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.acap.api.model.Locations;
import com.acap.api.model.Positions;
import com.acap.api.model.User;
import com.acap.api.repository.LocationRepository;
import com.acap.api.repository.PositionsRepository;
import com.acap.api.repository.UserRepository;
import com.acap.api.utils.Encrypt;

/**
 * Servicio que gestiona las operaciones relacionadas con los usuarios en el sistema.
 */
@Service
public class UserService {

  // Repositorios necesarios para acceder a datos de usuarios, posiciones y ubicaciones.
  private final UserRepository userRepository;
  private final PositionsRepository positionsRepository;
  private final LocationRepository locationsRepository;

  /**
   * Constructor del servicio de usuario.
   *
   * @param userRepository        Repositorio para acceder a datos de usuarios.
   * @param positionsRepository  Repositorio para acceder a datos de posiciones.
   * @param locationRepository   Repositorio para acceder a datos de ubicaciones.
   */
  public UserService(UserRepository userRepository, PositionsRepository positionsRepository, LocationRepository locationRepository) {
    this.positionsRepository = positionsRepository;
    this.userRepository = userRepository;
    this.locationsRepository = locationRepository;
  }

  /**
   * Busca usuarios por estado y el ID del usuario solicitante.
   *
   * @param status Estado del usuario (activo o inactivo).
   * @param userId ID del usuario solicitante.
   * @return Lista de usuarios encontrados.
   */
  public List<User> findUsersByStatus(boolean status, UUID userId) {
    return userRepository.findByStatus(status, userId);
  }

  /**
   * Busca usuarios que coincidan con el término de búsqueda y el ID del usuario solicitante.
   *
   * @param search Término de búsqueda.
   * @param userId ID del usuario solicitante.
   * @return Lista de usuarios encontrados.
   */
  public List<User> searchUsers(String search, UUID userId) {
    return userRepository.search(search, userId);
  }

  /**
   * Busca un usuario por su ID.
   *
   * @param id ID del usuario.
   * @return Usuario encontrado (si existe).
   */
  public Optional<User> findUserById(UUID id) {
    return userRepository.findById(id);
  }

  /**
   * Guarda o actualiza un usuario en la base de datos.
   *
   * @param user Usuario a guardar o actualizar.
   * @return Usuario guardado o actualizado.
   */
  @SuppressWarnings("null")
  public User saveUser(User user) {
    Optional<Positions> positionData = positionsRepository.findById(user.getPosition().getId());
    Optional<Locations> locationsData = locationsRepository.findById(user.getLocation().getId());

    if (positionData.isPresent()) {
      user.setPosition(positionData.get());
    }
    if (locationsData.isPresent()) {
      user.setLocation(locationsData.get());
    }

    if ("".equals(user.getPassword())) {
      Optional<User> userData = userRepository.findById(user.getId());
      if (userData.isPresent()) {
        user.setPassword(userData.get().getPassword());
      }
      return userRepository.save(user);
    }

    String encryptedPassword = Encrypt.encryptPassword(user.getPassword());
    user.setPassword(encryptedPassword);
    return userRepository.save(user);
  }

  /**
   * Cambia la contraseña de un usuario.
   *
   * @param userId          ID del usuario.
   * @param currentPassword Contraseña actual del usuario.
   * @param newPassword     Nueva contraseña del usuario.
   * @return Usuario con la contraseña cambiada (si la operación fue exitosa).
   */
  public User changePassword(UUID userId, String currentPassword, String newPassword) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new NullPointerException("Usuario no encontrado con ID: " + userId));    

    String passwordInDB = user.getPassword();

    if (!Encrypt.matchesPasswords(currentPassword, passwordInDB)) {
      return null;
    }

    String encryptedPassword = Encrypt.encryptPassword(newPassword);
    user.setPassword(encryptedPassword);
    userRepository.changePassword(userId, encryptedPassword);
    return user;
  }

  /**
   * Actualiza el estado (activo/inactivo) de un usuario.
   *
   * @param id    ID del usuario.
   * @param state Nuevo estado del usuario.
   */
  public void updateStatus(UUID id, boolean state) {
    userRepository.updateStatus(id, state);
  }

  /**
   * Obtiene un usuario por número de empleado, verificando su existencia, estado y contraseña.
   *
   * @param user Usuario con número de empleado y contraseña.
   * @return Usuario encontrado y válido (si existe y cumple con los criterios).
   */
  public User getUserByEmployeeNumber(User user) {
    User userData = userRepository.findByEmployeeNumber(user.getEmployeeNumber());

    // Verificar si el usuario existe.
    if (userData == null) { return null; }

    // Verificar si el usuario está activo.
    if (Boolean.FALSE.equals(userData.getStatus())) { return null; }

    // Verificar si la contraseña es correcta.
    if (!Encrypt.matchesPasswords(user.getPassword(), userData.getPassword())) { return null; }

    return userData;
  }
}

