package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Privileges;
import com.acap.api.repository.PrivilegesRepository;

@Service
public class PrivilegesService {

  private final PrivilegesRepository privilegesRepository;

  public PrivilegesService (PrivilegesRepository privilegesRepository) {
    this.privilegesRepository = privilegesRepository;
  }
  
  public List<Privileges> findAll () {
    return privilegesRepository.findAll();
  }
}
