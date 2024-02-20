package com.acap.api.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acap.api.Constants;
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

  // Get top 15 cintas order by creation date desc
  public List<Cintas> getCintas (boolean status) { 
    Pageable pageable = PageRequest.of(0, 15);
    return cintasRepository.findAllByStatusOrderByCreationDateDesc(status, pageable);
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

  // Update status cintas to expired
  public List<Cintas> updateStatusCintasExpired (LocalDateTime currentDate, Long locationId) {
    Optional<Status> status = statusRepository.findById(Constants.EXPIRED_STATUS_ID);

    if (!status.isPresent()) { return Collections.emptyList(); }

    cintasRepository.updateStatusForExpiredCintas(currentDate, locationId, status.get());

    return getExpiredCintas(currentDate, locationId);
  }

  // Update status cintas to retained
  public List<Cintas> updateStatusCitasRetained (LocalDateTime currentDate, Long locationId) {
    Optional<Status> status = statusRepository.findById(Constants.RETAINED_STATUS_ID);

    if (!status.isPresent()) { return Collections.emptyList(); }

    cintasRepository.updateStatusForRetainedCintas(currentDate, locationId, status.get());

    return getRetainedCintas(currentDate, locationId);
  }

  // Find expired Cintas
  public List<Cintas> getExpiredCintas (LocalDateTime currenDate, Long locationId) {
    return cintasRepository.findByExpiryDateLessThanEqualAndStatusIsTrueAndLocation(currenDate, locationId);
  }

  // Find retained cintas
  public List<Cintas> getRetainedCintas (LocalDateTime currentDate, Long locationId) {
    Optional<Locations> location = locationsRepository.findById(locationId);

    if (!location.isPresent()) { return Collections.emptyList(); }

    return cintasRepository.findByRententionDateLessThanEqualAndStatusIsTrueAndLocation(currentDate, location.get());
  }
}
