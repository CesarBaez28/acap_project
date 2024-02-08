package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.dto.EvidenceDTO;
import com.acap.api.model.Evidence;
import com.acap.api.model.Folders;
import com.acap.api.model.FoldersEvidence;
import com.acap.api.repository.EvidenceRepository;
import com.acap.api.repository.FoldersEvidenceRepository;
import com.acap.api.repository.FoldersRepository;

import java.util.ArrayList;

@Service
public class FoldersEvidenceService {
  private final FoldersRepository foldersRepository;
  private final EvidenceRepository evidenceRepository;
  private final FoldersEvidenceRepository foldersEvidenceRepository;

  public FoldersEvidenceService(FoldersEvidenceRepository foldersEvidenceRepository,
      FoldersRepository foldersRepository, EvidenceRepository evidenceRepository) {
    this.foldersEvidenceRepository = foldersEvidenceRepository;
    this.foldersRepository = foldersRepository;
    this.evidenceRepository = evidenceRepository;
  }

  public List<FoldersEvidence> findAllByFolder(Folders folders) {
    return foldersEvidenceRepository.findAllByFolders(folders);
  }

  public Object saveFoldersEvidence (EvidenceDTO data) {
    
    Folders folder = foldersRepository.save(data.getFolders());
    
    // Valida si solo suministran el nombre de la carpteta
    if (data.getEvidence() == null) {
      data.setFolders(folder);
      return data;
    }

    List<Evidence> evidence = new ArrayList<>();
    for (Evidence evidenceData : data.getEvidence()) {
      evidence.add(evidenceData);
    }

    List<Evidence> evidenceData = evidenceRepository.saveAll(evidence);

    List<FoldersEvidence> evidenceList = new ArrayList<>();
    for (Evidence evidenceFolder : evidenceData) {
      FoldersEvidence folderEvidence = new FoldersEvidence(folder, evidenceFolder);
      evidenceList.add(folderEvidence);
    }

    return foldersEvidenceRepository.saveAll(evidenceList);
  }

  public List<FoldersEvidence> removeEvidence (EvidenceDTO evidenceDTO) 
  {
    List<Evidence> evidence = evidenceDTO.getEvidence();

    List<FoldersEvidence> foldersEvidencesList = new ArrayList<>();
    for (Evidence evidenceData : evidence) {
      FoldersEvidence foldersEvidence = new FoldersEvidence(evidenceDTO.getFolders(), evidenceData);
      foldersEvidencesList.add(foldersEvidence);
    }

    foldersEvidenceRepository.deleteAll(foldersEvidencesList);
    evidenceRepository.deleteAll(evidence);

    return findAllByFolder(evidenceDTO.getFolders());
  }
}
