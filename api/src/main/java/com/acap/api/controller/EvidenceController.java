package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.Constants;
import com.acap.api.model.Evidence;
import com.acap.api.service.EvidenceService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "evidence")
@PreAuthorize("hasRole('"+ Constants.Roles.VIEW_EVIDENCE +"')")
public class EvidenceController {

  private final EvidenceService evidenceService;

  public EvidenceController(EvidenceService evidenceService) {
    this.evidenceService = evidenceService;
  }

  @PostMapping("/save")
  public ResponseEntity<Object> saEvidence(@RequestBody Evidence evidence) {
    try {
      Evidence evidenceData = evidenceService.saveEvidence(evidence);
      return ResponseEntity.status(HttpStatus.OK).body(evidenceData);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving evidence");
    }
  }

  @PutMapping("/rename/{id}/{newName}")
  @PreAuthorize("hasRole('"+ Constants.Roles.EDIT_EVIDENCE +"')")
  public ResponseEntity<String> renameFile(@PathVariable Long id, @PathVariable String newName) {
    try {
      evidenceService.renameEvidence(id, newName);
      return ResponseEntity.ok("Archivo renombrado exitosamente");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al renombrar el archivo");
    }
  }

}
