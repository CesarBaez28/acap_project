package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Positions;
import com.acap.api.repository.PositionsRepository;

@Service
public class PositionsService {
  private final PositionsRepository positionsRepository;

  public PositionsService (PositionsRepository positionsRepository) {
    this.positionsRepository = positionsRepository;
  }

  public List<Positions> findAll () {
    return positionsRepository.findAll();
  }

  public Positions savPosition (Positions position) {
    return positionsRepository.save(position);
  }

}
