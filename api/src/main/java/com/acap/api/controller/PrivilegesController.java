package com.acap.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Privileges;
import com.acap.api.service.PrivilegesService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * Clase controlador encargada de la gestión 
 * de privilegios
 */
@RestController
@RequestMapping(path = "privileges")
public class PrivilegesController {

  PrivilegesService privilegesService;

  public PrivilegesController (PrivilegesService privilegesService) {
    this.privilegesService = privilegesService;
  }

  // Endpoint para obtener el nombre de todos los privilegios
  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll () {
    try {
      List<Privileges> privileges = privilegesService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(privileges);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Error getting privileges");
    }
  }
}
