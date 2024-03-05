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

/*
 * Clase controlador que se encarga de 
 * gestionar las operaciones relaciondas 
 * con los nombres de los archivos que se suban 
 * como evidencia al destruir las cintas luego de
 * 10 años
 */
@RestController
@RequestMapping(path = "evidence")
@PreAuthorize("hasRole('"+ Constants.Roles.VIEW_EVIDENCE +"')")
public class EvidenceController {

  private final EvidenceService evidenceService;

  public EvidenceController(EvidenceService evidenceService) {
    this.evidenceService = evidenceService;
  }

  // Guardar nueva evidencia
  @PostMapping("/save")
  public ResponseEntity<Object> saEvidence(@RequestBody Evidence evidence) {
    try {
      // Guardar la nueva evidencia y devolver la respuesta
      Evidence evidenceData = evidenceService.saveEvidence(evidence);
      return ResponseEntity.status(HttpStatus.OK).body(evidenceData);
    } catch (Exception e) {
      // Manejar errores al guardar la evidencia
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving evidence");
    }
  }

  // Renombrar archivo de evidencia por ID
  @PutMapping("/rename/{id}/{newName}")
  // Anotación para la autorización de roles usando constantes definidas
  @PreAuthorize("hasRole('"+ Constants.Roles.EDIT_EVIDENCE +"')")
  public ResponseEntity<String> renameFile(@PathVariable Long id, @PathVariable String newName) {
    try {
      // Renombrar el archivo de evidencia por ID y devolver la respuesta
      evidenceService.renameEvidence(id, newName);
      return ResponseEntity.ok("Archivo renombrado exitosamente");
    } catch (Exception e) {
      // Manejar errores al renombrar el archivo de evidencia
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al renombrar el archivo");
    }
  }
}
