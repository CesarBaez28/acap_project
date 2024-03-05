package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.Constants;
import com.acap.api.model.CintasReceived;
import com.acap.api.service.CintasReceivedService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
 * Clase controlador que gestiona las 
 * operaciones relacionadas con las cintas 
 * que reciben las sucursales cuando se hace un
 * envío. 
 */
@RestController
@RequestMapping(path = "receiveCintas")
@PreAuthorize("hasAnyRole('"+ Constants.Roles.RECEPTION +"', '"+ Constants.Roles.VIEW_RECEIVED_SHIPMENTS +"')")
public class CintasReceivedController {

  private final CintasReceivedService cintasReceivedService;

  public CintasReceivedController (CintasReceivedService cintasReceivedService) {
    this.cintasReceivedService = cintasReceivedService;
  }

  // Guardar información sobre la recepción de cintas
  @PostMapping("/save")
  public ResponseEntity<Object> saveCintasReceived(@RequestBody CintasReceived cintasReceived) {
    try {
      // Guardar la información sobre la recepción de cintas y devolver la respuesta
      CintasReceived data =  cintasReceivedService.saveCintasReceived(cintasReceived);
      return ResponseEntity.status(HttpStatus.CREATED).body(data);      
    } catch (Exception e) {
      // Manejar errores al recibir las cintas
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error receiving cintas");
    }
  }

  // Obtener cintas recibidas por estado y ubicación de destino
  @GetMapping("/findByStatusAndLocationTo/{statusId}/{locationId}")
  public ResponseEntity<Object> findByStatusAndLocationTo(@PathVariable Long statusId, @PathVariable Long locationId) {
    try {
      // Obtener cintas recibidas por estado y ubicación de destino y devolver la respuesta
      List<CintasReceived> data  = cintasReceivedService.findTop15ByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
      return ResponseEntity.status(HttpStatus.OK).body(data);     
    } catch (Exception e) {
      // Manejar errores al obtener cintas recibidas
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting received cintas");
    }
  }

  // Obtener cintas recibidas por ubicación de destino y rango de fechas
  @GetMapping("/findByLocationToAndBetweenDate/{locationId}/{startDate}/{endDate}")
  public ResponseEntity<Object> findByLocationToAndBetweenDate (@PathVariable Long locationId, @PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      // Obtener cintas recibidas por ubicación de destino y rango de fechas y devolver la respuesta
      List<CintasReceived> data = cintasReceivedService.findByLocationToAndBetweenDate(locationId, startDate, endDate);    
      return ResponseEntity.status(HttpStatus.OK).body(data);      
    } catch (Exception e) {
      // Manejar errores al obtener cintas recibidas
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting received cintas");
    }
  }

  // Obtener cintas recibidas por rango de fechas de recepción
  @GetMapping("/findByDateReceived/{startDate}/{endDate}")
  public ResponseEntity<Object> findByDateReceivedBetween(@PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      // Obtener cintas recibidas por rango de fechas de recepción y devolver la respuesta
      List<CintasReceived> cintasReceiveds = cintasReceivedService.findByDateReceivedBetween(startDate, endDate);    
      return ResponseEntity.status(HttpStatus.OK).body(cintasReceiveds);
    } catch (Exception e) {
      // Manejar errores al obtener cintas recibidas
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting received cintas");
    }
  }
}
