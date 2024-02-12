package com.acap.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acap.api.dto.ShipmentDTO;
import com.acap.api.model.Cintas;
import com.acap.api.model.Drivers;
import com.acap.api.model.Locations;
import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.model.Signatures;
import com.acap.api.model.Status;
import com.acap.api.model.User;
import com.acap.api.repository.CintasRepository;
import com.acap.api.repository.DriversRepository;
import com.acap.api.repository.LocationRepository;
import com.acap.api.repository.ShipmentsCintasRepository;
import com.acap.api.repository.ShipmentsRepository;
import com.acap.api.repository.SignaturesRepository;
import com.acap.api.repository.StatusRepository;
import com.acap.api.repository.UserRepository;

@Service
public class ShipmentsCintasService {
  private final ShipmentsRepository shipmentsRepository;
  private final CintasRepository cintasRepository;
  private final ShipmentsCintasRepository shipmentsCintasRepository;
  private final UserRepository userRepository;
  private final SignaturesRepository signaturesRepository;
  private final DriversRepository driversRepository;
  private final LocationRepository locationRepository;
  private final StatusRepository statusRepository;

  public ShipmentsCintasService(
      ShipmentsRepository shipmentsRepository,
      CintasRepository cintasRepository,
      ShipmentsCintasRepository shipmentsCintasRepository,
      UserRepository userRepository,
      SignaturesRepository signaturesRepository,
      DriversRepository driversRepository,
      LocationRepository locationRepository,
      StatusRepository statusRepository) {
    this.shipmentsRepository = shipmentsRepository;
    this.shipmentsCintasRepository = shipmentsCintasRepository;
    this.cintasRepository = cintasRepository;
    this.userRepository = userRepository;
    this.signaturesRepository = signaturesRepository;
    this.driversRepository = driversRepository;
    this.locationRepository = locationRepository;
    this.statusRepository = statusRepository;
  }

  public List<ShipmentsCintas> top15ShipmentsCintasByUser (UUID userId) {
    Pageable pageable = PageRequest.of(0, 15);
    return shipmentsCintasRepository.findTop15ByUserIdOrderByDesc(userId, pageable);
  }

  public List<ShipmentsCintas> findAllByShipments(UUID uuid) throws NotFoundException {
    Optional<Shipments> shipment = shipmentsRepository.findById(uuid);

    if (!shipment.isPresent()) {
      throw new NotFoundException();
    }

    return shipmentsCintasRepository.findAllByShipments(shipment.get());
  }

  public List<ShipmentsCintas> saveShipmentsCintas(ShipmentDTO data) {
    Optional<User> userData = userRepository.findById(data.getShipment().getUser().getId());
    Optional<Signatures> signatureData = signaturesRepository.findById(data.getShipment().getSignature().getId());
    Optional<Drivers> driverData = driversRepository.findById(data.getShipment().getDriver().getId());
    Optional<Locations> locatioFromData = locationRepository.findById(data.getShipment().getLocationFrom().getId());
    Optional<Locations> locationToData = locationRepository.findById(data.getShipment().getLocationTo().getId());
    Optional<Status> statusData = statusRepository.findById(data.getShipment().getStatus().getId());

    if (userData.isPresent()) { data.getShipment().setUser(userData.get()); }
    if (signatureData.isPresent()) { data.getShipment().setSignature(signatureData.get()); }
    if (driverData.isPresent()) { data.getShipment().setDriver(driverData.get()); }
    if (locatioFromData.isPresent()) { data.getShipment().setLocationFrom(locatioFromData.get());}
    if (locationToData.isPresent()) { data.getShipment().setLocationTo(locationToData.get()); }
    if (statusData.isPresent()) { data.getShipment().setStatus(statusData.get()); }

    Shipments shipment = shipmentsRepository.save(data.getShipment());

    List<Cintas> cintas = new ArrayList<>();
    for (Cintas cinta : data.getCintas()) {
      cintas.add(cinta);
    }

    List<Cintas> cintasData = cintasRepository.findAllById(
        cintas.stream().map(Cintas::getId).collect(Collectors.toList()));


    System.out.println(cintasData);

    List<ShipmentsCintas> shipmentsCintas = new ArrayList<>();
    for (Cintas cinta : cintasData) {
      ShipmentsCintas shipmentCinta = new ShipmentsCintas(cinta, shipment);
      shipmentsCintas.add(shipmentCinta);
    }

    return shipmentsCintasRepository.saveAll(shipmentsCintas);
  }
}