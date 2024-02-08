package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.PositionsPrivilegesKey;

@Repository
public interface PositionsPrivilegesRepository extends JpaRepository<PositionsPrivileges, PositionsPrivilegesKey>{
  List<PositionsPrivileges> findAllByPositions(Positions positions);
}
