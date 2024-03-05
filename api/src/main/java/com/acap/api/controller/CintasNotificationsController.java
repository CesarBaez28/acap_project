package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.CintasNotifications;
import com.acap.api.service.CintasNotificationsService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
 * Clase controlador que gestiona las operaciones 
 * relacionadas con las notificaciones de cintas
 */
@RestController
@RequestMapping(path = "cintas/notifications")
public class CintasNotificationsController {

  // Inyección de dependencias para el servicio de notificaciones de cintas
  private final CintasNotificationsService cintasNotificationsService;

  // Constructor para inicializar el servicio de notificaciones de cintas
  public CintasNotificationsController (CintasNotificationsService cintasNotificationsService) {
    this.cintasNotificationsService = cintasNotificationsService;
  }

  // Guardar nueva notificación de cinta
  @PostMapping("/save")
  public ResponseEntity<Object> save (@RequestBody CintasNotifications entity) {
    try {
      // Guardar la notificación de cinta y devolver la respuesta
      CintasNotifications cintasNotification = cintasNotificationsService.save(entity);
      return ResponseEntity.status(HttpStatus.CREATED).body(cintasNotification);
    } catch (Exception e) {
      // Manejar errores al guardar la notificación de cinta
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving cintas notification: " + e);
    }
  }

  // Obtener notificaciones de cintas por ubicación
  @GetMapping("/findByLocation/{locationId}")
  public ResponseEntity<Object> findByLocation (@PathVariable Long locationId) {
    try {
      // Obtener notificaciones de cintas por ubicación y devolver la respuesta
      List<CintasNotifications> notifications = cintasNotificationsService.findByCintaLocation(locationId);
      return ResponseEntity.status(HttpStatus.OK).body(notifications);
    } catch (Exception e) {
      // Manejar errores al obtener notificaciones de cintas
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting cintas notifications: " + e);
    }
  }
}
