package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.acap.api.dto.SignatureDownLoadDTO;
import com.acap.api.dto.SignatureUploadDTO;
import com.acap.api.model.Signatures;
import com.acap.api.service.SignaturesService;

import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * Clase controlador que proporciona 
 * los endpoints para guardar la ruta 
 * y subir/descargar imágenes de firmas
 * de los choferes que transportan las 
 * cintas
 */
@RestController
@RequestMapping(path = "signatures")
public class SignaturesController {

  private final SignaturesService signaturesService;

  // Directorio de carga de firmas configurado mediante properties
  @Value("${evidence.upload-signatures-dir}")
  private String imageUploadDir;

  public SignaturesController(SignaturesService signaturesService) {
    this.signaturesService = signaturesService;
  }

  // Endpoint para guardar la ruta de la firma
  @PostMapping("/save")
  public ResponseEntity<Object> saveSignaturePath(@RequestBody Signatures signature) {
    try {
      // Llama al servicio para guardar la ruta de la firma
      Signatures signatureData = signaturesService.save(signature);
      // Devuelve la firma creada con el código de estado HTTP 201 (Created)
      return ResponseEntity.status(HttpStatus.CREATED).body(signatureData);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving signature path");
    }
  }

  // Endpoint para subir una imagen de firma
  @PostMapping("/upload")
  public ResponseEntity<String> saveSignatureImage(@RequestBody SignatureUploadDTO signatureUploadDTO) {
    try {
      // Obtiene la información de la imagen y el directorio de la solicitud
      String directoryName = signatureUploadDTO.getDirectoryName();
      String base64Image = signatureUploadDTO.getBase64Image();

      // Crea el directorio si no existe
      String directoryPath = imageUploadDir + File.separator + directoryName;
      File directory = new File(directoryPath);
      if (!directory.exists()) {
        directory.mkdirs();
      }

      // Decodifica la cadena Base64 a bytes
      byte[] imageBytes = java.util.Base64.getDecoder().decode(base64Image);

      // Genera un nombre de archivo único
      String fileName = "image_" + System.currentTimeMillis() + "." + "jpg";

      // Crea la ruta completa del archivo
      String filePath = directoryPath + File.separator + fileName;

      // Guarda la imagen en el directorio
      FileUtils.writeByteArrayToFile(new File(filePath), imageBytes);

      // Devuelve la ruta relativa del archivo
      return ResponseEntity.status(HttpStatus.OK).body(directoryName + File.separator + fileName);
    } catch (IOException e) {
      e.printStackTrace();
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving the image");
    }
  }

  // Endpoint para descargar una firma
  @SuppressWarnings("null")
  @PostMapping("/downLoad")
  public ResponseEntity<Object> downLoadSignature(@RequestBody SignatureDownLoadDTO signature) {
    try {
      // Obtiene la ruta de la firma desde la solicitud
      String path = signature.getPath();

      // Crea la ruta completa de la imagen
      String imagePath = imageUploadDir + File.separator + path;

      // Lee la imagen en un objeto BufferedImage
      BufferedImage image = ImageIO.read(new File(imagePath));

      // Devuelve la imagen con el tipo de contenido JPEG y el código de estado HTTP
      // 200 (OK)
      return ResponseEntity
          .ok()
          .contentType(MediaType.IMAGE_JPEG)
          .body(image);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error while downloading the signature image: " + e.getMessage());
    }
  }

}