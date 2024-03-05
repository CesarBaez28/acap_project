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
import org.springframework.stereotype.Service;

import com.acap.api.model.Shipments;
import com.acap.api.repository.ShipmentsCintasRepository;
import com.acap.api.repository.ShipmentsNotificationsRepository;
import com.acap.api.repository.ShipmentsRepository;
import com.acap.api.repository.SignaturesRepository;

/**
 * Servicio que gestiona los envíos.
 */
@Service
public class ShipmentsService {

  // Repositorios necesarios para acceder a datos.
  private final ShipmentsRepository shipmentsRepository;
  private final ShipmentsCintasRepository shipmentsCintasRepository;
  private final SignaturesRepository signaturesRepository;
  private final ShipmentsNotificationsRepository shipmentsNotificationsRepository;

  // Directorio de carga para las firmas de envíos.
  @Value("${evidence.upload-signatures-dir}")
  private String imageUploadDir;

  /**
   * Constructor del servicio de envíos.
   *
   * @param shipmentsRepository               Repositorio para acceder a datos de envíos.
   * @param shipmentsCintasRepository         Repositorio para acceder a datos de cintas en envíos.
   * @param signaturesRepository              Repositorio para acceder a datos de firmas.
   * @param shipmentsNotificationsRepository Repositorio para acceder a datos de notificaciones de envíos.
   */
  public ShipmentsService(ShipmentsRepository shipmentsRepository,
                          ShipmentsCintasRepository shipmentsCintasRepository,
                          SignaturesRepository signaturesRepository,
                          ShipmentsNotificationsRepository shipmentsNotificationsRepository) {
    this.shipmentsRepository = shipmentsRepository;
    this.shipmentsCintasRepository = shipmentsCintasRepository;
    this.signaturesRepository = signaturesRepository;
    this.shipmentsNotificationsRepository = shipmentsNotificationsRepository;
  }

  /**
   * Obtiene los últimos 15 envíos para un usuario específico.
   *
   * @param userId ID del usuario.
   * @return Lista de los últimos 15 envíos del usuario.
   */
  public List<Shipments> findTop15ByUserId(UUID userId) {
    Pageable pageable = PageRequest.of(0, 10);
    return shipmentsRepository.findTop15ByUserIdOrderByDesc(userId, pageable);
  }

  /**
   * Obtiene envíos por ID de estado y ID de ubicación destino, ordenados por fecha descendente.
   *
   * @param statusId   ID del estado.
   * @param locationId ID de la ubicación destino.
   * @return Lista de envíos que cumplen con los criterios de búsqueda.
   */
  public List<Shipments> findByStatusIdAndLocationToIdOrderByDateDesc(Long statusId, Long locationId) {
    return shipmentsRepository.findByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
  }

  /**
   * Obtiene envíos para un usuario específico en un rango de fechas.
   *
   * @param id    ID del usuario.
   * @param begin Fecha de inicio del rango.
   * @param end   Fecha de fin del rango.
   * @return Lista de envíos para el usuario en el rango de fechas especificado.
   */
  public List<Shipments> findByUserBetweenDates(UUID id, LocalDateTime begin, LocalDateTime end) {
    return shipmentsRepository.findByUserIdAndDateBetween(id, begin, end);
  }

  /**
   * Obtiene envíos en un rango de fechas, ordenados por fecha descendente.
   *
   * @param startDate Fecha de inicio del rango.
   * @param endDate   Fecha de fin del rango.
   * @return Lista de envíos en el rango de fechas especificado.
   */
  public List<Shipments> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate) {
    return shipmentsRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
  }

  /**
   * Elimina un envío y sus datos asociados.
   *
   * @param id ID del envío a eliminar.
   */
  @SuppressWarnings("null")
  public void deleteShipment(UUID id) {
    Optional<Shipments> shipmentData = shipmentsRepository.findById(id);

    if (shipmentData.isPresent()) {
      Shipments shipment = shipmentData.get();

      // Eliminar registros en shipments_cintas asociados a este shipment
      shipmentsCintasRepository.deleteByShipments(shipment);

      // Eliminar notificaciones asociadas a este shipment
      shipmentsNotificationsRepository.deleteByShipments(shipment);

      // Eliminar imagen de la firma asociada a este shipment
      Path filePath = Paths.get(imageUploadDir, shipment.getSignature().getPath());
      if (Files.exists(filePath)) {
        try {
          Files.delete(filePath);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }

      // Eliminar el shipment
      shipmentsRepository.delete(shipment);

      // Eliminar ruta de la firma en Base de datos
      signaturesRepository.deleteById(shipment.getSignature().getId());
    }
  }
}

