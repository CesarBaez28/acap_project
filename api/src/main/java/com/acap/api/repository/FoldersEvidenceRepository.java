package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Folders;
import com.acap.api.model.FoldersEvidence;
import com.acap.api.model.FoldersEvidenceKey;

@Repository
public interface FoldersEvidenceRepository extends JpaRepository<FoldersEvidence, FoldersEvidenceKey> {
  List<FoldersEvidence> findAllByFolders(Folders folders);
}
