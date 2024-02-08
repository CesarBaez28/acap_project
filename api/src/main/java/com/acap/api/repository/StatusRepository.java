package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long>{

}
