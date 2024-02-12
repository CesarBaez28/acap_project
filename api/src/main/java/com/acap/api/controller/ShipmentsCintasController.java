package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.dto.ShipmentDTO;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.service.ShipmentsCintasService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "shipments")
public class ShipmentsCintasController {
  private final ShipmentsCintasService shipmentsCintasService;

  public ShipmentsCintasController (ShipmentsCintasService shipmentsCintasService) {
    this.shipmentsCintasService = shipmentsCintasService;
  }

  @GetMapping("/getTop15ByUser")
  public ResponseEntity<Object> getTop15ByUser(@RequestParam UUID userId) {
    try {
      List<ShipmentsCintas> shipmentsCintas = shipmentsCintasService.top15ShipmentsCintasByUser(userId);
      return ResponseEntity.status(HttpStatus.OK).body(shipmentsCintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting cintas shipment");
    }
}

  @GetMapping("/getAllByShipment")
  public ResponseEntity<Object> getAllByShipment(@RequestParam UUID id) {
    try {
      List<ShipmentsCintas> shipmentsCintas = shipmentsCintasService.findAllByShipments(id);
      return ResponseEntity.status(HttpStatus.OK).body(shipmentsCintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting cintas shipment");
    }
  }
  
  @PostMapping("/save")
  public ResponseEntity<Object> saveShipment(@RequestBody ShipmentDTO data) {
    try {
      List<ShipmentsCintas> shipmentCinta = shipmentsCintasService.saveShipmentsCintas(data);
      return ResponseEntity.status(HttpStatus.CREATED).body(shipmentCinta);   
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering cintas shipment: " + e.getMessage());
    }
  }
}
