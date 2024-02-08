package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Shipments;
import com.acap.api.service.ShipmentsService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "shipments")
public class ShipmentsController {

  private final ShipmentsService shipmentsService;

  public ShipmentsController(ShipmentsService shipmentsService) {
    this.shipmentsService = shipmentsService;
  }

  @GetMapping("/fintTop15ByUser")
  public ResponseEntity<Object> fintTop15ByUser(@RequestParam UUID userId) {
    try {
      List<Shipments> shipments = shipmentsService.findTop15ByUserId(userId);
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the data base");
    }
  }

  @GetMapping("/findByUserAndBetweenDates/{userId}/{begin}/{end}")
  public ResponseEntity<Object> findByUserBetweenDates(
      @PathVariable UUID userId,
      @PathVariable LocalDateTime begin,
      @PathVariable LocalDateTime end) {

    try {
      List<Shipments> shipments = shipmentsService.findByUserBetweenDates(userId, begin, end);
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the database");
    }
  }

  @GetMapping("/findByStatusAndLocation/{statusId}/{locationId}")
  public ResponseEntity<Object> findByUserBetweenDates(
      @PathVariable Long statusId,
      @PathVariable Long locationId) {
    try {
      List<Shipments> shipments = shipmentsService.findByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the database");
    }
  }

  @GetMapping("/findByDateBetween/{startDate}/{endDate}")
  public ResponseEntity<Object> findByDateBetween(@PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      List<Shipments> shipments = shipmentsService.findByDateBetween(startDate, endDate);     
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the databse");
    }
  }

  @DeleteMapping("/deleteById/{id}")
  public ResponseEntity<Object> deleteById(@PathVariable UUID id) {
    try {
      shipmentsService.deleteShipment(id);
      return ResponseEntity.status(HttpStatus.OK).body("Shipment deleted successfully");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting shipment");
    }
  }
}
