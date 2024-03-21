// Importaciones necesarias
package com.acap.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.Constants;
import com.acap.api.dto.ChangePasswordDTO;
import com.acap.api.model.User;
import com.acap.api.service.UserService;
import com.acap.api.utils.ErrorMessage;
import com.acap.api.utils.ValidationGroups.LoginUser;
import com.acap.api.utils.ValidationGroups.UserEdit;
import com.acap.api.utils.ValidationGroups.UserRegister;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

/*
 * Clase controlador que proporciona 
 * endpoints para buscar, actualizar y gestionar usuarios
 */
@RestController
@RequestMapping(path = "users")
public class UserController {

  // Servicio de usuarios inyectado como dependencia
  private final UserService userService;

  // Constructor para inicializar el servicio de usuarios
  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Método privado para manejar la validación y guardar el usuario
  private ResponseEntity<Object> handleValidationAndSaveUser(User user, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      ErrorMessage error = new ErrorMessage("Validation failed", bindingResult.getFieldErrors());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    try {
      // Llama al servicio para guardar el usuario
      User userData = userService.saveUser(user);
      // Devuelve el usuario guardado con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(userData);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  // Endpoint para obtener usuarios por estado y ID de usuario
  @GetMapping("/find/{status}/{userId}")
  public ResponseEntity<Object> getUsersByStatus(@PathVariable boolean status, @PathVariable UUID userId) {
    try {
      // Llama al servicio para obtener usuarios por estado y ID de usuario
      List<User> users = userService.findUsersByStatus(status, userId);
      // Devuelve la lista de usuarios con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(users);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding users by status");
    }
  }

  // Endpoint para buscar usuarios por término de búsqueda y ID de usuario
  @GetMapping("/search")
  public ResponseEntity<Object> searchUsers(@RequestParam String search, @RequestParam UUID userId) {
    try {
      // Llama al servicio para buscar usuarios por término de búsqueda y ID de
      // usuario
      List<User> users = userService.searchUsers(search, userId);
      // Devuelve la lista de usuarios con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(users);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while searching users");
    }
  }

  // Endpoint para actualizar el estado de un usuario por ID
  @PutMapping("/update/status/{id}/{state}")
  @PreAuthorize("hasRole('" + Constants.Roles.DELETE_USER + "')")
  public ResponseEntity<Object> updateStatus(@PathVariable UUID id, @PathVariable boolean state) {
    try {
      // Llama al servicio para actualizar el estado del usuario
      userService.updateStatus(id, state);
      // Devuelve un mensaje de éxito con el código de estado HTTP 200 (OK)
      return ResponseEntity.ok().body("User updated");
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.internalServerError().body("Error updating");
    }
  }

  // Endpoint para cambiar la contraseña de un usuario por ID
  @PutMapping("/update/password/{id}")
  public ResponseEntity<Object> changePassword(@PathVariable UUID id, @RequestBody ChangePasswordDTO changePassword) {
    try {
      // Llama al servicio para cambiar la contraseña del usuario
      User user = userService.changePassword(id, changePassword.getCurrentPassword(), changePassword.getNewPassword());

      if (user == null) {
        // Si la contraseña actual es incorrecta, devuelve un mensaje de error con el
        // código de estado HTTP 404 (Not Found)
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contraseña actual incorrecta");
      }

      // Devuelve el usuario actualizado con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(user);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.internalServerError().body("Error changing password user");
    }
  }

  // Endpoint para registrar un usuario
  @PostMapping
  @PreAuthorize("hasRole('" + Constants.Roles.CREATE_USER + "')")
  public ResponseEntity<Object> registUser(
      @Validated(value = { UserRegister.class }) @RequestBody User user,
      BindingResult bindingResult) {
    // Llama al método privado para manejar la validación y guardar el usuario
    return handleValidationAndSaveUser(user, bindingResult);
  }

  // Endpoint para editar un usuario
  @PutMapping
  @PreAuthorize("hasRole('" + Constants.Roles.EDIT_USER + "')")
  public ResponseEntity<Object> editUser(
      @Validated(value = { UserEdit.class }) @RequestBody User user,
      BindingResult bindingResult) {
    // Llama al método privado para manejar la validación y guardar el usuario
    return handleValidationAndSaveUser(user, bindingResult);
  }

  // Endpoint para editar el perfil propio de usuario
  @PutMapping("/profile")
  public ResponseEntity<Object> editUserProfile(
    @Validated(value = {UserEdit.class}) @RequestBody User user,
    BindingResult bindingResult) {      

      return handleValidationAndSaveUser(user, bindingResult);
  }

  // Endpoint para iniciar sesión de usuario
  @PostMapping("/login")
  public ResponseEntity<Object> logUser(@Validated(LoginUser.class) @RequestBody User user,
      BindingResult bindingResult) {
    try {
      if (bindingResult.hasErrors()) {
        // Si la validación falla, devuelve un mensaje de error con el código de estado
        // HTTP 400 (Bad Request)
        ErrorMessage error = new ErrorMessage("Validation failed", bindingResult.getFieldErrors());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
      }

      // Llama al servicio para obtener el usuario por número de empleado
      User userdata = userService.getUserByEmployeeNumber(user);

      // Si el usuario no existe (contraseña o nombre de usuario incorrecto), devuelve
      // un mensaje de error con el código de estado HTTP 400 (Bad Request)
      if (userdata == null) {
        ErrorMessage error = new ErrorMessage("Contraseña o número de empleado incorrecto");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
      }

      // Devuelve el usuario con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(userdata);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e);
    }
  }
}
