package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Locations;
import com.acap.api.service.LocationsService;
import com.acap.api.utils.ErrorMessage;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "location")
public class LocationsController {
  private final LocationsService locationsService;

  public LocationsController (LocationsService locationsService) {
    this.locationsService = locationsService;
  }

  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll () {
    try {
      List<Locations> location = locationsService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(location);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding locations");
    }
  }  

  @PostMapping("/save")
  public ResponseEntity<Object> saveLocations (@RequestBody Locations locations) {
    try {
      Locations locationData = locationsService.saveLocation(locations);
      return ResponseEntity.status(HttpStatus.CREATED).body(locationData);
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Location name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }
}
