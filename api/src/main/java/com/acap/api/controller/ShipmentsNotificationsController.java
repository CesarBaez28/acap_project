package com.acap.api.controller;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.Constants;
import com.acap.api.model.ShipmentsNotifications;
import com.acap.api.service.ShipmentsNotificationsService;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
 * Clase controlador encargado de las
 * notificaciones cuando se genera un envío 
 */
@RestController
@RequestMapping(path = "shipments/notifications")
@PreAuthorize("hasAnyRole('"+ Constants.Roles.VIEW_SHIPMENTS +"', '"+ Constants.Roles.RECEPTION +"', '"+ Constants.Roles.VIEW_HISTORY_SHIPMENTS +"', '"+ Constants.Roles.REGISTER_SHIPMENT +"')")
public class ShipmentsNotificationsController {

  private final ShipmentsNotificationsService shipmentsNotificationsService;

  public ShipmentsNotificationsController (ShipmentsNotificationsService shipmentsNotificationsService) {
    this.shipmentsNotificationsService = shipmentsNotificationsService;
  }

  // Endpoint para guardar una nueva notificación de envío
  @PostMapping("/save")
  public ResponseEntity<Object> save (@RequestBody ShipmentsNotifications data) {
    try {
      // Llama al servicio para guardar la notificación de envío
      ShipmentsNotifications shipmentsNotifications = shipmentsNotificationsService.save(data);
      // Devuelve la notificación de envío creada con el código de estado HTTP 201 (Created)
      return ResponseEntity.status(HttpStatus.CREATED).body(shipmentsNotifications);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving shipment notification: " + e);
    }
  } 

  // Endpoint para obtener notificaciones de envíos por ubicación
  @GetMapping("/findByLocation/{locationId}")
  public ResponseEntity<Object> getByLocation (@PathVariable Long locationId) {
    try {
      // Llama al servicio para obtener notificaciones de envíos por ubicación
      List<ShipmentsNotifications> data = shipmentsNotificationsService.findByLocationToId(locationId);
      // Devuelve la lista de notificaciones de envíos con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(data);      
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while getting shipments notifications: " + e);
    }
  }  
}
