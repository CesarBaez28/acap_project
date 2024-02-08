package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Privileges;

@Repository
public interface PrivilegesRepository extends JpaRepository<Privileges, Long>  {
  
}
