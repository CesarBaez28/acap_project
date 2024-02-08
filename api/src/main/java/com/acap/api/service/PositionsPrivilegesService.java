package com.acap.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.dto.PrivilegesDTO;
import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.Privileges;
import com.acap.api.repository.PositionsPrivilegesRepository;

@Service
public class PositionsPrivilegesService {
  private final PositionsPrivilegesRepository positionsPrivilegesRepository;


  public PositionsPrivilegesService (PositionsPrivilegesRepository positionsPrivilegesRepository) {
    this.positionsPrivilegesRepository = positionsPrivilegesRepository;
  }

  public List<PositionsPrivileges> findByPosition (Positions position) {
    return positionsPrivilegesRepository.findAllByPositions(position);
  }

  public List<PositionsPrivileges> assingPrivileges (PrivilegesDTO privilegesDTO) {
    List<Privileges> privileges = privilegesDTO.getPrivileges();

    List<PositionsPrivileges> positionsPrivilegesList = new ArrayList<>();
    for (Privileges data : privileges) {
      PositionsPrivileges positionsPrivileges = new PositionsPrivileges(privilegesDTO.getPosition(), data);
      positionsPrivilegesList.add(positionsPrivileges);
    }

    return positionsPrivilegesRepository.saveAll(positionsPrivilegesList);
  }

  public List<PositionsPrivileges> removePrivileges (PrivilegesDTO privilegesDTO) {
    List<Privileges> privileges = privilegesDTO.getPrivileges();

    List<PositionsPrivileges> positionsPrivilegesList = new ArrayList<>();
    for (Privileges data : privileges) {
      PositionsPrivileges positionsPrivileges = new PositionsPrivileges(privilegesDTO.getPosition(), data);
      positionsPrivilegesList.add(positionsPrivileges);
    }

    positionsPrivilegesRepository.deleteAll(positionsPrivilegesList);
    
    return positionsPrivilegesRepository.findAllByPositions(privilegesDTO.getPosition());
  }
}
