package com.acap.api.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acap.api.model.Shipments;
import com.acap.api.repository.ShipmentsCintasRepository;
import com.acap.api.repository.ShipmentsRepository;
import com.acap.api.repository.SignaturesRepository;

@Service
public class ShipmentsService {
  private final ShipmentsRepository shipmentsRepository;
  private final ShipmentsCintasRepository shipmentsCintasRepository;
  private SignaturesRepository signaturesRepository;

  @Value("${evidence.upload-signatures-dir}")
  private String imageUploadDir;

  public ShipmentsService(ShipmentsRepository shipmentsRepository, ShipmentsCintasRepository shipmentsCintasRepository, SignaturesRepository signaturesRepository) {
    this.shipmentsRepository = shipmentsRepository;
    this.shipmentsCintasRepository = shipmentsCintasRepository;
    this.signaturesRepository = signaturesRepository;
  }

  public List<Shipments> findTop15ByUserId(UUID userId) {
    Pageable pageable = PageRequest.of(0, 10);
    return shipmentsRepository.findTop15ByUserIdOrderByDesc(userId, pageable);
  }

  public List<Shipments> findByStatusIdAndLocationToIdOrderByDateDesc(Long statusId, Long locationId) {
    return shipmentsRepository.findByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
  }

  public List<Shipments> findByUserBetweenDates(UUID id, LocalDateTime begin, LocalDateTime end) {
    return shipmentsRepository.findByUserIdAndDateBetween(id, begin, end);
  }

  public List<Shipments> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate) {
    return shipmentsRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
  }

  public void deleteShipment(UUID id) {
    Optional<Shipments> shipmentData = shipmentsRepository.findById(id);

    if (shipmentData.isPresent()) {
      Shipments shipment = shipmentData.get();

      // Eliminar registros en shipments_cintas asociados a este shipment
      shipmentsCintasRepository.deleteByShipments(shipment);

      // Eliminar imagen de la firma asociada a este shipment
      Path filePath = Paths.get(imageUploadDir, shipment.getSignature().getPath());
      if (Files.exists(filePath)) { try {
        Files.delete(filePath);
      } catch (IOException e) {
        e.printStackTrace();
      } }

      // Eliminar el shipment
      shipmentsRepository.delete(shipment);

      // Eiminar ruta de la firma en Base de datos
      signaturesRepository.deleteById(shipment.getSignature().getId());
    }
  }
}
