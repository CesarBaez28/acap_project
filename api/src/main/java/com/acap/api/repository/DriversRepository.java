package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Drivers;

@Repository
public interface DriversRepository extends JpaRepository<Drivers, Long>{
  
}
