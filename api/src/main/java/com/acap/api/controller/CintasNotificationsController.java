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

@RestController
@RequestMapping(path = "cintas/notifications")
public class CintasNotificationsController {

  private final CintasNotificationsService cintasNotificationsService;

  public CintasNotificationsController (CintasNotificationsService cintasNotificationsService) {
    this.cintasNotificationsService = cintasNotificationsService;
  }

  @PostMapping("/save")
  public ResponseEntity<Object> save (@RequestBody CintasNotifications entity) {
    try {
      CintasNotifications cintasNotification = cintasNotificationsService.save(entity);
      return ResponseEntity.status(HttpStatus.CREATED).body(cintasNotification);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while savig cintas notification: " + e);
    }
  }

  @GetMapping("/findByLocation/{locationId}")
  public ResponseEntity<Object> findByLocation (@PathVariable Long locationId) {
    try {
      List<CintasNotifications> notifications = cintasNotificationsService.findByCintaLocation(locationId);
      return ResponseEntity.status(HttpStatus.OK).body(notifications);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting cintas notifications: " + e);
    }
  }
  
}
