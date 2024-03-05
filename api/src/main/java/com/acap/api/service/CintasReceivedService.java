package com.acap.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acap.api.Constants;
import com.acap.api.model.Cintas;
import com.acap.api.model.CintasReceived;
import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.model.Status;
import com.acap.api.model.User;
import com.acap.api.repository.CintasReceivedRepository;
import com.acap.api.repository.CintasRepository;
import com.acap.api.repository.ShipmentsCintasRepository;
import com.acap.api.repository.ShipmentsNotificationsRepository;
import com.acap.api.repository.ShipmentsRepository;
import com.acap.api.repository.StatusRepository;
import com.acap.api.repository.UserRepository;

/**
 * Servicio para la gestión de cintas recibidas.
 * Proporciona métodos para guardar cintas recibidas, buscarlas por estado y ubicación, y realizar consultas entre fechas.
 */
@Service
public class CintasReceivedService {

  private final CintasReceivedRepository cintasReceivedRepository;
  private final ShipmentsCintasRepository shipmentsCintasRepository;
  private final StatusRepository statusRepository;
  private final UserRepository userRepository;
  private final ShipmentsRepository shipmentsRepository;
  private final CintasRepository cintasRepository;
  private final ShipmentsNotificationsRepository shipmentsNotificationsRepository;

  /**
   * Constructor que inyecta las dependencias necesarias para el servicio.
   *
   * @param cintasReceivedRepository Repositorio de cintas recibidas.
   * @param shipmentsCintasRepository Repositorio de cintas en envíos.
   * @param statusRepository Repositorio de estados.
   * @param userRepository Repositorio de usuarios.
   * @param shipmentsRepository Repositorio de envíos.
   * @param cintasRepository Repositorio de cintas.
   * @param shipmentsNotificationsRepository Repositorio de notificaciones de envíos.
   */
  public CintasReceivedService(
      CintasReceivedRepository cintasReceivedRepository,
      ShipmentsCintasRepository shipmentsCintasRepository,
      StatusRepository statusRepository,
      UserRepository userRepository,
      ShipmentsRepository shipmentsRepository,
      CintasRepository cintasRepository, 
      ShipmentsNotificationsRepository shipmentsNotificationsRepository) {

    this.cintasReceivedRepository = cintasReceivedRepository;
    this.shipmentsCintasRepository = shipmentsCintasRepository;
    this.statusRepository = statusRepository;
    this.userRepository = userRepository;
    this.shipmentsRepository = shipmentsRepository;
    this.cintasRepository = cintasRepository;
    this.shipmentsNotificationsRepository = shipmentsNotificationsRepository;
  }

  /**
   * Guarda una cinta recibida, actualiza el estado del envío y las cintas asociadas, y elimina notificaciones del envío.
   *
   * @param cintasReceived La cinta recibida a guardar.
   * @return La cinta recibida guardada.
   */
  @SuppressWarnings("null")
  public CintasReceived saveCintasReceived(CintasReceived cintasReceived) {
    Optional<Status> statusData = statusRepository.findById(cintasReceived.getStatus().getId());
    Optional<Status> statusShipment = statusRepository.findById(Constants.DELIVERED_STATUS_ID);
    Optional<User> userData = userRepository.findById(cintasReceived.getUserReceived().getId());
    Optional<Shipments> shipmentData =  shipmentsRepository.findById(cintasReceived.getShipment().getId());
    
    if (statusData.isPresent()) { cintasReceived.setStatus(statusData.get()); }
    if (userData.isPresent()) { cintasReceived.setUserReceived(userData.get()); }
    if (shipmentData.isPresent()) { cintasReceived.setShipment(shipmentData.get()); }

    if (statusShipment.isPresent()) {
      shipmentsRepository.updateStatus(statusShipment.get(), cintasReceived.getShipment().getId());
    }

    List<ShipmentsCintas> shipmentsCintas = shipmentsCintasRepository.findAllByShipments(cintasReceived.getShipment());

    List<Cintas> cintas = new ArrayList<>();
    for (ShipmentsCintas data : shipmentsCintas) {
      Cintas cinta = data.getCintas();
      cinta.setLocation(cintasReceived.getShipment().getLocationTo());
      cintas.add(cinta);
    }

    shipmentsNotificationsRepository.deleteByShipments(cintasReceived.getShipment());
    
    cintasRepository.saveAll(cintas);
    
    return cintasReceivedRepository.save(cintasReceived);
  }

  /**
   * Busca las últimas 15 cintas recibidas por estado y ubicación ordenadas por fecha descendente.
   *
   * @param statusId Identificador del estado.
   * @param locationToId Identificador de la ubicación.
   * @return Lista de las últimas 15 cintas recibidas.
   */
  public List<CintasReceived> findTop15ByStatusIdAndLocationToIdOrderByDateDesc(Long statusId, Long locationToId) {
    Pageable pageable = PageRequest.of(0, 15);
    return cintasReceivedRepository.findTop15ByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationToId, pageable);
  }

  /**
   * Busca cintas recibidas por ubicación y entre fechas.
   *
   * @param locationId Identificador de la ubicación.
   * @param startDate Fecha de inicio.
   * @param endDate Fecha de fin.
   * @return Lista de cintas recibidas entre las fechas proporcionadas.
   */
  public List<CintasReceived> findByLocationToAndBetweenDate(Long locationId, LocalDateTime startDate, LocalDateTime endDate) {
    return cintasReceivedRepository.findByLocationToAndBetweenDate(locationId, startDate, endDate);
  }

  /**
   * Busca cintas recibidas por fecha de recepción entre las fechas proporcionadas.
   *
   * @param startDate Fecha de inicio.
   * @param endDate Fecha de fin.
   * @return Lista de cintas recibidas entre las fechas proporcionadas.
   */
  public List<CintasReceived> findByDateReceivedBetween(LocalDateTime startDate, LocalDateTime endDate) {
    return cintasReceivedRepository.findByDateReceivedBetweenOrderByDateReceivedDesc(startDate, endDate);
  }
}
