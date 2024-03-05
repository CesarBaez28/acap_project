package com.acap.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsNotifications;
import com.acap.api.repository.ShipmentsNotificationsRepository;
import com.acap.api.repository.ShipmentsRepository;

/**
 * Servicio que gestiona las notificaciones de envíos.
 */
@Service
public class ShipmentsNotificationsService {

  // Repositorios necesarios para acceder a datos.
  private final ShipmentsNotificationsRepository shipmentsNotificationsRepository;
  private final ShipmentsRepository shipmentsRepository;

  /**
   * Constructor del servicio de notificaciones de envíos.
   *
   * @param shipmentsNotificationsRepository Repositorio para acceder a datos de notificaciones de envíos.
   * @param shipmentsRepository               Repositorio para acceder a datos de envíos.
   */
  public ShipmentsNotificationsService(
      ShipmentsNotificationsRepository shipmentsNotificationsRepository,
      ShipmentsRepository shipmentsRepository) {
    this.shipmentsNotificationsRepository = shipmentsNotificationsRepository;
    this.shipmentsRepository = shipmentsRepository;
  }

  /**
   * Guarda una notificación de envío.
   *
   * @param shipmentsNotification Notificación de envío a guardar.
   * @return Notificación de envío guardada.
   */
  @SuppressWarnings("null")
  public ShipmentsNotifications save(ShipmentsNotifications shipmentsNotification) {
    Optional<Shipments> shipmentOptional = shipmentsRepository.findById(shipmentsNotification.getShipment().getId());

    if (shipmentOptional.isPresent()) {
      shipmentsNotification.setShipment(shipmentOptional.get());
    }

    return shipmentsNotificationsRepository.save(shipmentsNotification);
  }

  /**
   * Obtiene todas las notificaciones de envíos para una ubicación específica.
   *
   * @param locationId ID de la ubicación.
   * @return Lista de notificaciones de envíos para la ubicación.
   */
  public List<ShipmentsNotifications> findByLocationToId(Long locationId) {
    return shipmentsNotificationsRepository.findByLocationToId(locationId);
  }
}

