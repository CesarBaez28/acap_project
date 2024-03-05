package com.acap.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.acap.api.Constants;
import com.acap.api.dto.EvidenceDTO;
import com.acap.api.model.Folders;
import com.acap.api.model.FoldersEvidence;
import com.acap.api.service.FoldersEvidenceService;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador que encarga de las operaciones
 * relacionadas con las carpetas y evidencias de las mismas
 * al momento de destuir las cintas
 */
@RestController
@RequestMapping(path = "evidence")
@PreAuthorize("hasRole('" + Constants.Roles.VIEW_EVIDENCE + "')")
public class FoldersEvidenceController {

  private final FoldersEvidenceService foldersEvidenceService;

  // Ruta del directorio de carga de evidencia obtenida desde la configuración
  @Value("${evidence.upload-dir}")
  private String evidenceUploadDir;

  public FoldersEvidenceController(FoldersEvidenceService foldersEvidenceService) {
    this.foldersEvidenceService = foldersEvidenceService;
  }

  // Endpoint para guardar evidencia en carpetas
  @PostMapping
  public ResponseEntity<Object> saveFoldersEvidences(@RequestBody EvidenceDTO data) {
    try {
      Object evidenceData = foldersEvidenceService.saveFoldersEvidence(data);
      return ResponseEntity.status(HttpStatus.CREATED).body(evidenceData);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving evidence");
    }
  }

  // Endpoint para eliminar evidencia de carpetas
  @PostMapping("/remove")
  public ResponseEntity<Object> removeFoldersEvidence(@RequestBody EvidenceDTO evidenceDTO) {
    try {
      List<FoldersEvidence> foldersEvidences = foldersEvidenceService.removeEvidence(evidenceDTO);
      return ResponseEntity.status(HttpStatus.OK).body(foldersEvidences);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing evidence");
    }
  }

  // Endpoint para buscar evidencia por carpeta
  @PostMapping("/search")
  public ResponseEntity<Object> findAllByFolder(@RequestBody Folders folder) {
    try {
      List<FoldersEvidence> foldersEvidences = foldersEvidenceService.findAllByFolder(folder);
      return ResponseEntity.status(HttpStatus.OK).body(foldersEvidences);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding evidence");
    }
  }

  // Endpoint para subir archivos a una carpeta de evidencia
  @PostMapping("/uploadFiles")
  public ResponseEntity<String> handleFileUpload(@RequestParam("folderName") String folderName,
      @RequestParam("files") MultipartFile[] files) {
    try {
      String folderPath = evidenceUploadDir + File.separator + folderName;

      // Crear la carpeta si no existe
      File folder = new File(folderPath);
      if (!folder.exists()) {
        folder.mkdirs();
      }

      for (MultipartFile file : files) {
        String filePath = folderPath + File.separator + file.getOriginalFilename();
        file.transferTo(new File(filePath));
      }

      return ResponseEntity.ok("Archivos subidos exitosamente");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir archivos");
    }
  }

  // Endpoint para descargar un archivo de evidencia
  @GetMapping("/downdLoadFile/{folderName}/{fileName:.+}")
  public ResponseEntity<byte[]> downloadFile(@PathVariable String folderName, @PathVariable String fileName) {
    try {
      Path filePath = Paths.get(evidenceUploadDir, folderName, fileName);
      byte[] fileContent = java.nio.file.Files.readAllBytes(filePath);

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
      headers.setContentDispositionFormData(fileName, fileName);

      return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).build();
    }
  }

  // Endpoint para eliminar un archivo de evidencia
  @DeleteMapping("/deleteFile/{folderName}/{fileName:.+}")
  @PreAuthorize("hasRole('" + Constants.Roles.DELETE_EVIDENCE + "')")
  public ResponseEntity<String> deleteFile(@PathVariable String folderName, @PathVariable String fileName) {
    try {
      Path filePath = Paths.get(evidenceUploadDir, folderName, fileName);

      if (Files.exists(filePath)) {
        Files.delete(filePath);
        return ResponseEntity.ok("Archivo eliminado exitosamente");
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al eliminar el archivo");
    }
  }

  // Endpoint para renombrar un archivo de evidencia
  @PutMapping("/renameFile/{folderName}/{oldFileName:.+}")
  @PreAuthorize("hasRole('" + Constants.Roles.EDIT_EVIDENCE + "')")
  public ResponseEntity<String> renameFile(
      @PathVariable String folderName,
      @PathVariable String oldFileName,
      @RequestParam String newFileName) {
    try {
      Path oldFilePath = Paths.get(evidenceUploadDir, folderName, oldFileName);
      Path newFilePath = Paths.get(evidenceUploadDir, folderName, newFileName);

      if (Files.exists(oldFilePath)) {
        Files.move(oldFilePath, newFilePath);
        return ResponseEntity.ok("Archivo renombrado exitosamente");
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("Error al renombrar el archivo");
    }
  }

  // Endpoint para descargar una carpeta completa como archivo zip
  @GetMapping("/download/{folderName}")
  public ResponseEntity<byte[]> downloadFolder(@PathVariable String folderName) {
    try {
      Path folderPath = Paths.get(evidenceUploadDir, folderName);
      List<File> filesToZip = listFilesInDirectory(folderPath);

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      try (ZipArchiveOutputStream zos = new ZipArchiveOutputStream(baos)) {
        for (File file : filesToZip) {
          addFileToZip(zos, folderPath, file);
        }
      }

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
      headers.setContentDispositionFormData("attachment", folderName + ".zip");

      return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).build();
    }
  }

  // Método auxiliar para listar archivos en un directorio
  private List<File> listFilesInDirectory(Path directory) throws IOException {
    List<File> files = new ArrayList<>();
    Files.walk(directory, FileVisitOption.FOLLOW_LINKS)
        .filter(path -> !Files.isDirectory(path))
        .forEach(path -> files.add(path.toFile()));
    return files;
  }

  // Método auxiliar para agregar un archivo a un archivo zip
  private void addFileToZip(ZipArchiveOutputStream zos, Path sourceFolder, File file) throws IOException {
    String entryName = sourceFolder.relativize(file.toPath()).toString().replace(File.separator, "/");
    ZipArchiveEntry entry = new ZipArchiveEntry(entryName);
    zos.putArchiveEntry(entry);

    try (FileInputStream fis = new FileInputStream(file)) {
      byte[] buffer = new byte[1024];
      int len;
      while ((len = fis.read(buffer)) > 0) {
        zos.write(buffer, 0, len);
      }
    }

    zos.closeArchiveEntry();
  }
}
