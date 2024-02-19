package com.acap.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acap.api.model.Cintas;
import com.acap.api.model.CintasNotifications;
import com.acap.api.repository.CintasNotificationsRepository;
import com.acap.api.repository.CintasRepository;

@Service
public class CintasNotificationsService {

  private final CintasNotificationsRepository cintasNotificationsRepository;
  private final CintasRepository cintasRepository;

  public CintasNotificationsService (CintasNotificationsRepository cintasNotificationsRepository, CintasRepository cintasRepository) {
    this.cintasNotificationsRepository = cintasNotificationsRepository;
    this.cintasRepository = cintasRepository;
  }

  public CintasNotifications save (CintasNotifications cintasNotifications) {
    Optional<Cintas> cinta = cintasRepository.findById(cintasNotifications.getCinta().getId());

    if (cinta.isPresent()) { cintasNotifications.setCinta(cinta.get()); }

    return cintasNotificationsRepository.save(cintasNotifications);
  }

  public List<CintasNotifications> findByCintaLocation (Long locationId) {
    return cintasNotificationsRepository.findByCintaLocation(locationId);
  }
}
