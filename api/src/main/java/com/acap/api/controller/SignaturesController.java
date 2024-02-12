package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.dto.SignatureDownLoadDTO;
import com.acap.api.dto.SignatureUploadDTO;
import com.acap.api.model.Signatures;
import com.acap.api.service.SignaturesService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "signatures")
public class SignaturesController {
  private final SignaturesService signaturesService;

  @Value("${evidence.upload-signatures-dir}")
  private String imageUploadDir;

  public SignaturesController(SignaturesService signaturesService) {
    this.signaturesService = signaturesService;
  }

  @PostMapping("/save")
  public ResponseEntity<Object> saveSignaturePath(@RequestBody Signatures signature) {
    try {
      Signatures signatureData = signaturesService.save(signature);
      return ResponseEntity.status(HttpStatus.CREATED).body(signatureData);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving signature path");
    }
  }

  @PostMapping("/upload")
  public ResponseEntity<String> saveSignatureImage(@RequestBody SignatureUploadDTO signatureUploadDTO) {

    try {
      String directoryName = signatureUploadDTO.getDirectoryName();
      String base64Image = signatureUploadDTO.getBase64Image();

      String directoryPath = imageUploadDir + File.separator + directoryName;
      File directory = new File(directoryPath);
      if (!directory.exists()) {
        directory.mkdirs();
      }

      // Decodificar la cadena base64 a bytes
      byte[] imageBytes = java.util.Base64.getDecoder().decode(base64Image);

      // Generar un nombre de archivo único
      String fileName = "image_" + System.currentTimeMillis() + "." + "jpg";

      // Crear la ruta completa del archivo
      String filePath = directoryPath + File.separator + fileName;

      // Guardar la imagen en el directorio
      FileUtils.writeByteArrayToFile(new File(filePath), imageBytes);

      return ResponseEntity.status(HttpStatus.OK).body(directoryName + File.separator + fileName);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving the image");
    }
  }

  @PostMapping("/downLoad")
  public ResponseEntity<Object> downLoadSignature(@RequestBody SignatureDownLoadDTO signature) {
    try {
      String path = signature.getPath();

      String imagePath = imageUploadDir + File.separator + path;

      BufferedImage image = ImageIO.read(new File(imagePath));

      return ResponseEntity
          .ok()
          .contentType(MediaType.IMAGE_JPEG)
          .body(image);

    } catch (Exception e) {
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error while downloading the signature image: " + e.getMessage());
    }
  }

}