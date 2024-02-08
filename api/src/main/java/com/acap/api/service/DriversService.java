package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Drivers;
import com.acap.api.repository.DriversRepository;

@Service
public class DriversService {
  private final DriversRepository driversRepository;

  public DriversService (DriversRepository driversRepository) {
    this.driversRepository = driversRepository;
  }

  public List<Drivers> findAll () {
    return driversRepository.findAll();
  }

  public Drivers saveDriver (Drivers driver) {
    return driversRepository.save(driver);
  }

}
