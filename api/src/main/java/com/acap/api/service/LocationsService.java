package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Locations;
import com.acap.api.repository.LocationRepository;

@Service
public class LocationsService {
  private final LocationRepository locationRepository;

  public LocationsService (LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  public List<Locations> findAll () {
    return locationRepository.findAll();
  }

  public Locations saveLocation (Locations locations) {
    return locationRepository.save(locations);
  }
}
