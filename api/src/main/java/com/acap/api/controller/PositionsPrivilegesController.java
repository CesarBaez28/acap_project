package com.acap.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acap.api.Constants;
import com.acap.api.dto.PrivilegesDTO;
import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.service.PositionsPrivilegesService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "privileges")
public class PositionsPrivilegesController {

  private final PositionsPrivilegesService positionsPrivilegesService;

  public PositionsPrivilegesController (PositionsPrivilegesService positionsPrivilegesService) {
    this.positionsPrivilegesService = positionsPrivilegesService;
  }

  @PostMapping("/remove")
  @PreAuthorize("hasRole('"+ Constants.Roles.ASSING_PRIVILEGES +"')")
  public ResponseEntity<Object> removePrivileges (@RequestBody PrivilegesDTO data) {
    try {
      List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesService.removePrivileges(data);
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing privileges");
    }
  }
  
  @PostMapping("/get")
  public ResponseEntity<Object> findByPosition (@RequestBody Positions position) {  
    try {
      List<PositionsPrivileges> positionsPrivileges =  positionsPrivilegesService.findByPosition(position);
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding privileges");
    }
  }
  
  @PostMapping
  @PreAuthorize("hasRole('"+ Constants.Roles.ASSING_PRIVILEGES +"')")
  public ResponseEntity<Object> assingPrivileges (@RequestBody PrivilegesDTO data) {  
    try {
      List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesService.assingPrivileges(data);
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning privileges");
    }
  }
}
