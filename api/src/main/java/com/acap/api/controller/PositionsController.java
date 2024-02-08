package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Positions;
import com.acap.api.service.PositionsService;
import com.acap.api.utils.ErrorMessage;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "positions")
public class PositionsController {
  private final PositionsService positionsService;

  public PositionsController(PositionsService positionsService) {
    this.positionsService = positionsService;
  }

  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll() {
    try {
      List<Positions> positions = positionsService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(positions);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding positions");
    }
  }

  @PostMapping("/save")
  public ResponseEntity<Object> savePositions(@RequestBody Positions positions) {
    try {
      Positions positionData = positionsService.savPosition(positions);
      return ResponseEntity.status(HttpStatus.CREATED).body(positionData);
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Position name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }

}
