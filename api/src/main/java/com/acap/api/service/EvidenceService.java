package com.acap.api.service;

import org.springframework.stereotype.Service;

import com.acap.api.model.Evidence;
import com.acap.api.repository.EvidenceRepository;

@Service
public class EvidenceService {
  private final EvidenceRepository evidenceRepository;

  public EvidenceService (EvidenceRepository evidenceRepository) {
    this.evidenceRepository = evidenceRepository;
  }

  public Evidence saveEvidence (Evidence evidence) {
    return evidenceRepository.save(evidence);
  }

  public void renameEvidence (Long id, String newName) {
    evidenceRepository.update(id, newName);
  }
}
