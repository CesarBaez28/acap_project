package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Folders;

@Repository
public interface FoldersRepository extends JpaRepository<Folders, Long>{

}
