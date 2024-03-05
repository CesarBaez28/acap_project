package com.acap.api.service;

import org.springframework.stereotype.Service;

import com.acap.api.model.Signatures;
import com.acap.api.repository.SignaturesRepository;

/**
 * Servicio que gestiona las firmas 
 * de los choferes.
 */
@Service
public class SignaturesService {

  // Repositorio necesario para acceder a datos de firmas.
  private final SignaturesRepository signaturesRepository;

  /**
   * Constructor del servicio de firmas.
   *
   * @param signaturesRepository Repositorio para acceder a datos de firmas.
   */
  public SignaturesService(SignaturesRepository signaturesRepository) {
    this.signaturesRepository = signaturesRepository;
  }

  /**
   * Guarda una firma en el repositorio.
   *
   * @param signature Firma a ser guardada.
   * @return Firma guardada en el repositorio.
   */
  @SuppressWarnings("null")
  public Signatures save(Signatures signature) {
    return signaturesRepository.save(signature);
  }
}

