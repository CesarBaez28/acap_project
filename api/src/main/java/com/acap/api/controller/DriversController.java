package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Drivers;
import com.acap.api.service.DriversService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping(path = "drivers")
public class DriversController {
  private final DriversService driversService;

  public DriversController (DriversService driversService) {
    this.driversService = driversService;
  }

  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll () {
    try {
      List<Drivers> drivers = driversService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(drivers);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting drivers");
    }
  }

  @PostMapping("/save")
  public ResponseEntity<Object> save (@RequestBody Drivers driver) {
    try {
      Drivers driverData = driversService.saveDriver(driver);
      return ResponseEntity.status(HttpStatus.CREATED).body(driverData);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the driver");
    }
  }
 
}
