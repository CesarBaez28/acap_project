package com.acap.api.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.User;
import com.acap.api.repository.PositionsPrivilegesRepository;
import com.acap.api.repository.UserRepository;

/**
 * Implementación de la interfaz UserDetailsService que carga los detalles de usuario
 * desde la base de datos para la autenticación de Spring Security.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  // Repositorios necesarios para acceder a datos de usuarios y privilegios por posición.
  private final UserRepository userRepository;
  private final PositionsPrivilegesRepository positionsPrivilegesRepository;

  /**
   * Constructor del servicio de detalles de usuario.
   *
   * @param userRepository               Repositorio para acceder a datos de usuarios.
   * @param positionsPrivilegesRepository Repositorio para acceder a datos de privilegios por posición.
   */
  public UserDetailsServiceImpl(UserRepository userRepository, PositionsPrivilegesRepository positionsPrivilegesRepository) {
    this.userRepository = userRepository;
    this.positionsPrivilegesRepository = positionsPrivilegesRepository;
  }

  /**
   * Carga los detalles de usuario por nombre de usuario.
   *
   * @param username Nombre de usuario.
   * @return Detalles de usuario para la autenticación de Spring Security.
   * @throws UsernameNotFoundException Excepción lanzada si el nombre de usuario no es válido.
   */
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // Obtener usuario por número de empleado desde la base de datos.
    User user = userRepository.findByEmployeeNumber(username);

    if (user == null) {
      throw new UsernameNotFoundException("Usuario no encontrado con el número de empleado: " + username);
    }

    // Obtener privilegios asociados a la posición del usuario.
    List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesRepository.findAllByPositions(user.getPosition());

    // Mapear privilegios a roles de Spring Security.
    List<String> privileges = positionsPrivileges.stream()
        .map(element -> element.getPrivileges().getPrivilege())
        .collect(Collectors.toList());

    // Crear una colección de autoridades (roles) para el usuario.
    Collection<? extends GrantedAuthority> authorities = privileges
        .stream()
        .map(privilege -> new SimpleGrantedAuthority("ROLE_" + privilege))
        .collect(Collectors.toSet());

    // Crear y retornar los detalles del usuario para la autenticación de Spring Security.
    return new org.springframework.security.core.userdetails.User(user.getEmployeeNumber(),
        user.getPassword(),
        true,
        true,
        true,
        true,
        authorities);
  }
}

