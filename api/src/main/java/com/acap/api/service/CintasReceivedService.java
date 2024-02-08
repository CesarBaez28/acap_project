package com.acap.api.service;

import java.time.LocalDate;
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
import com.acap.api.repository.ShipmentsRepository;
import com.acap.api.repository.StatusRepository;
import com.acap.api.repository.UserRepository;

@Service
public class CintasReceivedService {
  private final CintasReceivedRepository cintasReceivedRepository;
  private final ShipmentsCintasRepository shipmentsCintasRepository;
  private final StatusRepository statusRepository;
  private final UserRepository userRepository;
  private final ShipmentsRepository shipmentsRepository;
  private final CintasRepository cintasRepository;

  public CintasReceivedService(
      CintasReceivedRepository cintasReceivedRepository,
      ShipmentsCintasRepository shipmentsCintasRepository,
      StatusRepository statusRepository,
      UserRepository userRepository,
      ShipmentsRepository shipmentsRepository,
      CintasRepository cintasRepository) {

    this.cintasReceivedRepository = cintasReceivedRepository;
    this.shipmentsCintasRepository = shipmentsCintasRepository;
    this.statusRepository = statusRepository;
    this.userRepository = userRepository;
    this.shipmentsRepository = shipmentsRepository;
    this.cintasRepository = cintasRepository;
  }

  public CintasReceived saveCintasReceived (CintasReceived cintasReceived) {
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
    
    cintasRepository.saveAll(cintas);
    
    return cintasReceivedRepository.save(cintasReceived);
  }

  public List<CintasReceived> findTop15ByStatusIdAndLocationToIdOrderByDateDesc (Long statusId, Long locationToId) {
    Pageable pageable = PageRequest.of(0, 15);
    return cintasReceivedRepository.findTop15ByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationToId, pageable);
  }

  public List<CintasReceived> findByLocationToAndBetweenDate (Long locationId, LocalDateTime starDate, LocalDateTime endDate) {
    return cintasReceivedRepository.findByLocationToAndBetweenDate(locationId, starDate, endDate);
  }

  public List<CintasReceived> findByDateReceivedBetween (LocalDateTime startDate, LocalDateTime endDate) {
    return cintasReceivedRepository.findByDateReceivedBetweenOrderByDateReceivedDesc(startDate, endDate);
  }
}
