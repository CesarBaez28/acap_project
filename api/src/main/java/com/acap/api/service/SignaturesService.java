package com.acap.api.service;

import org.springframework.stereotype.Service;

import com.acap.api.model.Signatures;
import com.acap.api.repository.SignaturesRepository;

@Service
public class SignaturesService {
  private final SignaturesRepository signaturesRepository;

  public SignaturesService (SignaturesRepository signaturesRepository) {
    this.signaturesRepository = signaturesRepository;
  }

  public Signatures save (Signatures signature) {
    return signaturesRepository.save(signature);
  }
}
