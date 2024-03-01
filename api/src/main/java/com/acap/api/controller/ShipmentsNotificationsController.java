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

@RestController
@RequestMapping(path = "shipments/notifications")
@PreAuthorize("hasAnyRole('"+ Constants.Roles.VIEW_SHIPMENTS +"', '"+ Constants.Roles.RECEPTION +"', '"+ Constants.Roles.VIEW_HISTORY_SHIPMENTS +"', '"+ Constants.Roles.REGISTER_SHIPMENT +"')")
public class ShipmentsNotificationsController {

  private final ShipmentsNotificationsService shipmentsNotificationsService;

  public ShipmentsNotificationsController (ShipmentsNotificationsService shipmentsNotificationsService) {
    this.shipmentsNotificationsService = shipmentsNotificationsService;
  }

  @PostMapping("/save")
  public ResponseEntity<Object> save (@RequestBody ShipmentsNotifications data) {
    try {
      ShipmentsNotifications shipmentsNotifications = shipmentsNotificationsService.save(data);
      return ResponseEntity.status(HttpStatus.CREATED).body(shipmentsNotifications);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving shipment notification: " + e);
    }
  } 

  @GetMapping("/findByLocation/{locationId}")
  public ResponseEntity<Object> getByLocation (@PathVariable Long locationId) {
    try {
      List<ShipmentsNotifications> data = shipmentsNotificationsService.findByLocationToId(locationId);
      return ResponseEntity.status(HttpStatus.OK).body(data);      
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while geting shipments notifications: " + e);
    }
  }  
}
