package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.model.Status;
import com.acap.api.service.StatusService;
import com.acap.api.utils.ErrorMessage;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(path = "status")
public class StatusController {
  private final StatusService statusService;

  public StatusController (StatusService statusService) {
    this.statusService = statusService;
  }

  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll () {
    try {
      List<Status> status = statusService.findAll();
      return ResponseEntity.status(HttpStatus.OK).body(status);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding status");
    }
  }

  @PostMapping("/save")
  public ResponseEntity<Object> saveStatus (@RequestBody Status status) {  
    try {
     Status statusData = statusService.saveStatus(status);
     return ResponseEntity.status(HttpStatus.CREATED).body(statusData);
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Status name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }
}
