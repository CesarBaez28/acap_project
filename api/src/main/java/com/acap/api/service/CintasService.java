package com.acap.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.acap.api.model.Cintas;
import com.acap.api.model.Locations;
import com.acap.api.model.Status;
import com.acap.api.repository.CintasRepository;
import com.acap.api.repository.LocationRepository;
import com.acap.api.repository.StatusRepository;

@Service
public class CintasService {
  private final CintasRepository cintasRepository;
  private final LocationRepository locationsRepository;
  private final StatusRepository statusRepository;

  public CintasService (CintasRepository cintasRepository, LocationRepository locations, StatusRepository status) {
    this.cintasRepository = cintasRepository;
    this.locationsRepository =  locations;
    this.statusRepository = status;
  }

  // Get all the cintas order by creation date
  public List<Cintas> getCintas (boolean status) {
    return cintasRepository.findAllByStatusOrderByCreationDateAsc(status);
  }

  // Search cintas without date
  public List<Cintas> search (String search) {
    return cintasRepository.search(search);
  }
  
  // Search cintas Between date
  public List<Cintas> searchBetweenDates (String search, String begin, String end) {
    LocalDateTime initialDate = LocalDateTime.parse(begin);
    LocalDateTime finalDate = LocalDateTime.parse(end);
    return cintasRepository.searchBetweenDates(search, initialDate, finalDate);
  }

  // Get all cintas between dates
  public List<Cintas> getCintasBetweenDates (String begin, String end, boolean status) {
    LocalDateTime initialDate = LocalDateTime.parse(begin);
    LocalDateTime finalDate = LocalDateTime.parse(end);
    return cintasRepository.findByCreationDateBetweenAndStatus(initialDate, finalDate, status);
  }

  public List<Cintas> getCintaByLabel (String label) {
    return cintasRepository.findByLabelAndStatus(label);
  }

  // insert and update a cinta
  public Cintas saveCinta (Cintas cintas) {
    Optional<Locations> locationData = locationsRepository.findById(cintas.getLocation().getId());
    Optional<Status> statusData = statusRepository.findById(cintas.getStatusCinta().getId()); 

    if (locationData.isPresent()) { cintas.setLocation(locationData.get()); }

    if (statusData.isPresent()) { cintas.setStatusCinta(statusData.get()); }

    return cintasRepository.save(cintas);
  }  

  // delete cinta (change status cinta to false)
  public void deleteCinta (UUID id, Status status) {
    Optional<Status> statusData = statusRepository.findById(status.getId());
    if (statusData.isPresent()) { status = statusData.get(); }
    cintasRepository.update(id, status);
  }

  //Change location of a cinta
  public void changeLocation (List<UUID> ids, Locations location) {
    Optional<Locations> locationData = locationsRepository.findById(location.getId());
    if (locationData.isPresent()) {  location = locationData.get(); }

    for (UUID uuid : ids) {
      cintasRepository.changeLocation(uuid, location);  
    }
  }
}
