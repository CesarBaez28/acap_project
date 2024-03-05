package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Drivers;
import com.acap.api.service.DriversService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador que gestiona las
 * operaciones relacionadas con los conductores
 * que transportan los envíos de cintas
 */
@RestController
@RequestMapping(path = "drivers")
public class DriversController {

  private final DriversService driversService;

  public DriversController(DriversService driversService) {
    this.driversService = driversService;
  }

  // Obtener todos los conductores
  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll() {
    try {
      // Obtener todos los conductores y devolver la respuesta
      List<Drivers> drivers = driversService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(drivers);
    } catch (Exception e) {
      // Manejar errores al obtener los conductores
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting drivers");
    }
  }

  // Guardar un nuevo conductor
  @PostMapping("/save")
  public ResponseEntity<Object> save(@RequestBody Drivers driver) {
    try {
      // Guardar el nuevo conductor y devolver la respuesta
      Drivers driverData = driversService.saveDriver(driver);
      return ResponseEntity.status(HttpStatus.CREATED).body(driverData);
    } catch (Exception e) {
      // Manejar errores al guardar el conductor
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the driver");
    }
  }
}
