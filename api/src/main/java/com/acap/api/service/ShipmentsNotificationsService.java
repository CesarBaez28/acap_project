package com.acap.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsNotifications;
import com.acap.api.repository.ShipmentsNotificationsRepository;
import com.acap.api.repository.ShipmentsRepository;

@Service
public class ShipmentsNotificationsService {

  private final ShipmentsNotificationsRepository shipmentsNotificationsRepository;
  private final ShipmentsRepository shipmentsRepository;

  public ShipmentsNotificationsService (ShipmentsNotificationsRepository shipmentsNotificationsRepository, ShipmentsRepository shipmentsRepository) {
    this.shipmentsNotificationsRepository = shipmentsNotificationsRepository;
    this.shipmentsRepository = shipmentsRepository;
  }

  public ShipmentsNotifications save (ShipmentsNotifications shipmentsNotification) {
    Optional<Shipments> shipmnetOptional = shipmentsRepository.findById(shipmentsNotification.getShipment().getId());

    if (shipmnetOptional.isPresent()) { shipmentsNotification.setShipment(shipmnetOptional.get());  }
    
    return shipmentsNotificationsRepository.save(shipmentsNotification);
  }

  public List<ShipmentsNotifications> findByLocationToId (Long locationId) {
    return shipmentsNotificationsRepository.findByLocationToId(locationId);
  }
}
