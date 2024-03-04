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

@RestController
@RequestMapping(path = "users")
public class UserController {

  private final UserService userService;

  private ResponseEntity<Object> handleValidationAndSaveUser(User user, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      ErrorMessage error = new ErrorMessage("Validation failed", bindingResult.getFieldErrors());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    try {
      User userData = userService.saveUser(user);
      return ResponseEntity.status(HttpStatus.OK).body(userData);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/find/{status}/{userId}")
  public ResponseEntity<Object> getUsersByStatus(@PathVariable boolean status, @PathVariable UUID userId) {
    try {
      List<User> users = userService.findUsersByStatus(status, userId);
      return ResponseEntity.status(HttpStatus.OK).body(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding users by status");
    }
  }

  @GetMapping("/search")
  public ResponseEntity<Object> searchUsers(@RequestParam String search, @RequestParam UUID userId) {
    try {
      List<User> users = userService.searchUsers(search, userId);
      return ResponseEntity.status(HttpStatus.OK).body(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while searching users");
    }
  }

  @PutMapping("/update/status/{id}/{state}")
  @PreAuthorize("hasRole('"+ Constants.Roles.DELETE_USER +"')")
  public ResponseEntity<Object> updateStaus(@PathVariable UUID id, @PathVariable boolean state) {
    try {
      userService.updateStatus(id, state);
      return ResponseEntity.ok().body("User updated");
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error updating");
    }
  }

  @PutMapping("/update/password/{id}")
  public ResponseEntity<Object> changePassword(@PathVariable UUID id, @RequestBody ChangePasswordDTO changePassword) {
    try {
      User user = userService.changePassword(id, changePassword.getCurrentPassword(), changePassword.getNewPassword());

      if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contraseña actual incorrecta");
      }

      return ResponseEntity.status(HttpStatus.OK).body(user);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error changing password user");
    }
  }

  @PostMapping
  @PreAuthorize("hasRole('"+ Constants.Roles.CREATE_USER +"')")
  public ResponseEntity<Object> registOrEditUser(
      @Validated(value = { UserRegister.class }) @RequestBody User user,
      BindingResult bindingResult) {

    return handleValidationAndSaveUser(user, bindingResult);
  }

  @PutMapping
  @PreAuthorize("hasRole('"+ Constants.Roles.EDIT_USER +"')")
  public ResponseEntity<Object> editUser(
      @Validated(value = { UserEdit.class }) @RequestBody User user,
      BindingResult bindingResult) {

    return handleValidationAndSaveUser(user, bindingResult);
  }

  @PostMapping("/login")
  public ResponseEntity<Object> logUser(@Validated(LoginUser.class) @RequestBody User user,
      BindingResult bindingResult) {

    try {
      if (bindingResult.hasErrors()) {
        ErrorMessage error = new ErrorMessage("Validation failed", bindingResult.getFieldErrors());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
      }

      User userdata = userService.getUserByEmployeeNumber(user);

      // Password or username incorrect
      if (userdata == null) {
        ErrorMessage error = new ErrorMessage("Contraseña o número de empleado incorrecto");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
      }

      return ResponseEntity.status(HttpStatus.OK).body(userdata);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e);
    }
  }
}