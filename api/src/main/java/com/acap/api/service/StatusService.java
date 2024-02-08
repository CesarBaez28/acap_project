package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Status;
import com.acap.api.repository.StatusRepository;

@Service
public class StatusService {
  private final StatusRepository statusRepository;

  public StatusService (StatusRepository statusRepository) {
    this.statusRepository = statusRepository;
  }

  public List<Status> findAll () {
    return statusRepository.findAll();
  }

  public Status saveStatus (Status status) {
    return statusRepository.save(status);
  }
}
