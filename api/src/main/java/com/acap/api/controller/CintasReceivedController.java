package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.CintasReceived;
import com.acap.api.service.CintasReceivedService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "receiveCintas")
public class CintasReceivedController {
  private final CintasReceivedService cintasReceivedService;

  public CintasReceivedController (CintasReceivedService cintasReceivedService) {
    this.cintasReceivedService = cintasReceivedService;
  }

  @PostMapping("/save")
  public ResponseEntity<Object> saveCintasReceived(@RequestBody CintasReceived cintasReceived) {
    try {
      CintasReceived data =  cintasReceivedService.saveCintasReceived(cintasReceived);
      return ResponseEntity.status(HttpStatus.CREATED).body(data);      
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errror receiving cintas");
    }
  }

  @GetMapping("/findByStatusAndLocationTo/{statusId}/{locationId}")
  public ResponseEntity<Object> findByStatusAndLocationTo(@PathVariable Long statusId, @PathVariable Long locationId) {
    try {
      List<CintasReceived> data  = cintasReceivedService.findTop15ByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
      return ResponseEntity.status(HttpStatus.OK).body(data);     
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting received cintas");
    }
  }

  @GetMapping("/findByLocationToAndBetweenDate/{locationId}/{startDate}/{endDate}")
  public ResponseEntity<Object> findByLocationToAndBetweenDate (@PathVariable Long locationId, @PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      List<CintasReceived> data = cintasReceivedService.findByLocationToAndBetweenDate(locationId, startDate, endDate);    
      return ResponseEntity.status(HttpStatus.OK).body(data);      
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Geting received Cintas");
    }
  }

  @GetMapping("/findByDateReceived/{startDate}/{endDate}")
  public ResponseEntity<Object> findByDateReceivedBetween(@PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      List<CintasReceived> cintasReceiveds = cintasReceivedService.findByDateReceivedBetween(startDate, endDate);    
      return ResponseEntity.status(HttpStatus.OK).body(cintasReceiveds);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting received cintas");
    }
  }
  
}
