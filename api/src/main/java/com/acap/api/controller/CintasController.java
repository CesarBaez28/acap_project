package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.Constants;
import com.acap.api.dto.ChangeLocationsDTO;
import com.acap.api.model.Cintas;
import com.acap.api.model.Status;
import com.acap.api.service.CintasService;
import com.acap.api.utils.BarCodeGenerator;
import com.acap.api.utils.ErrorMessage;
import com.acap.api.utils.GenerateEXCEL;
import com.acap.api.utils.GeneratePDF;
import com.itextpdf.text.DocumentException;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(path = "cintas")
@PreAuthorize("hasRole('"+ Constants.Roles.VIEW_INVENTORY +"')")
public class CintasController {

  private final CintasService cintasService;

  public CintasController(CintasService cintasService) {
    this.cintasService = cintasService;
  }

  @GetMapping("{status}")
  public ResponseEntity<Object> geCintas(@PathVariable boolean status) {
    try {
      List<Cintas> cintas = cintasService.getCintas(status);
      return ResponseEntity.status(HttpStatus.OK).body(cintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while geting cintas");
    }
  }

  @GetMapping("/search/{search}")
  public ResponseEntity<Object> search(@PathVariable String search) {
    try {
      List<Cintas> cintas = cintasService.search(search);
      return ResponseEntity.status(HttpStatus.OK).body(cintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while searching cintta");
    }
  }

  @GetMapping("/searchWithDates")
  public ResponseEntity<Object> searchWitdDates(@RequestParam String search, @RequestParam String begin,
      @RequestParam String end) {
    try {
      List<Cintas> cintas = cintasService.searchBetweenDates(search, begin, end);
      return ResponseEntity.status(HttpStatus.OK).body(cintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while searchin cinta with date");
    }
  }

  @GetMapping("/findByDate")
  public ResponseEntity<Object> getByDate(@RequestParam String begin, @RequestParam String end,
      @RequestParam boolean status) {
    try {
      List<Cintas> cintas = cintasService.getCintasBetweenDates(begin, end, status);
      return ResponseEntity.status(HttpStatus.OK).body(cintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while geting cintas with date");
    }

  }

  @GetMapping("/findByLabel/{label}")
  public ResponseEntity<Object> getByLabel(@PathVariable String label) {
    try {
      List<Cintas> cintas = cintasService.getCintaByLabel(label);
      return ResponseEntity.status(HttpStatus.OK).body(cintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting cinta");
    }
  }

  @PreAuthorize("hasAnyRole('"+ Constants.Roles.CREATE_CINTA +"', '"+ Constants.Roles.EDIT_CINTA +"')")
  @PostMapping
  public ResponseEntity<Object> saveCinta(@Valid @RequestBody Cintas cinta, BindingResult bindingResult) {

    if (bindingResult.hasErrors()) {
      ErrorMessage error = new ErrorMessage("Validation failed", bindingResult.getFieldErrors());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    try {
      Cintas cintaData = cintasService.saveCinta(cinta);
      return ResponseEntity.status(HttpStatus.OK).body(cintaData);
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Duplicated label name");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }

  @GetMapping(value = "/barcode/{barcodeText}", produces = MediaType.IMAGE_PNG_VALUE)
  public BufferedImage generateCode(@PathVariable String barcodeText) throws Exception {
    return BarCodeGenerator.generateBarCode3Of9(barcodeText);
  }

  @PostMapping("/pdf")
  public ResponseEntity<byte[]> generatePdf(@RequestBody List<Cintas> cintas) throws DocumentException {
    ByteArrayOutputStream pdfStream = GeneratePDF.generatePdfStream(cintas);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_PDF);
    headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=inventario.pdf");

    return ResponseEntity.ok()
        .headers(headers)
        .contentLength(pdfStream.size())
        .body(pdfStream.toByteArray());
  }

  @PostMapping("/excel")
  public ResponseEntity<byte[]> generateExcel(@RequestBody List<Cintas> cintas) throws IOException {
    ByteArrayOutputStream excelStream = GenerateEXCEL.generateExcelStream(cintas);

    HttpHeaders headers = new HttpHeaders();
    headers
        .setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
    headers.setContentDispositionFormData("attachment", "inventario.xlsx");

    return ResponseEntity.ok()
        .headers(headers)
        .body(excelStream.toByteArray());
  }

  // Delete cinta (change status to false and statusCinta to Eliminado)
  @PreAuthorize("hasRole('"+ Constants.Roles.DELETE_CINTA +"')")
  @PutMapping("/delete/{id}")
  public ResponseEntity<Object> deleteCinta(@PathVariable UUID id, @RequestBody Status status) {
    try {
      cintasService.deleteCinta(id, status);
      return ResponseEntity.status(HttpStatus.OK).body("Cinta deleted");
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Error deleting cinta");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }

  @PutMapping("/changeLocations")
  @PreAuthorize("hasRole('"+ Constants.Roles.MOVE_DATA_CENTER +"')")
  public ResponseEntity<Object> changeLocation(@RequestBody ChangeLocationsDTO changeLocations) {
    try {
      cintasService.changeLocation(changeLocations.getIds(), changeLocations.getLocation());
      return ResponseEntity.status(HttpStatus.OK).body("Cintas updated");
    } catch (Exception e) {
      ErrorMessage error = new ErrorMessage("Error changing locations of cintas");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }

  @GetMapping("/getExpiredCintas/{currentDate}/{locationId}")
  public ResponseEntity<Object> getExpiredCintas (@PathVariable LocalDateTime currentDate, @PathVariable Long locationId) {
    try {
      List<Cintas> expiredCintas = cintasService.updateStatusCintasExpired(currentDate, locationId);
      return ResponseEntity.status(HttpStatus.OK).body(expiredCintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting expired cintas: " + e);
    }      
  }

  @GetMapping("/getRetainedCintas/{currentDate}/{locationId}")
  public ResponseEntity<Object> getRetainedCintas (@PathVariable LocalDateTime currentDate, @PathVariable Long locationId) {
    try {
      List<Cintas> retainedCintas = cintasService.updateStatusCitasRetained(currentDate, locationId);
      return ResponseEntity.status(HttpStatus.OK).body(retainedCintas);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error geting retained cintas: " + e);
    }
  }
  
}