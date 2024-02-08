package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Folders;
import com.acap.api.repository.FoldersRepository;

@Service
public class FoldersService {
  private final FoldersRepository foldersRepository;

  public FoldersService (FoldersRepository foldersRepository) {
    this.foldersRepository = foldersRepository;
  }

  public Folders saveFolder (Folders folder) {
    return foldersRepository.save(folder);
  }

  public List<Folders> findAll () {
    return foldersRepository.findAll();
  }
}
