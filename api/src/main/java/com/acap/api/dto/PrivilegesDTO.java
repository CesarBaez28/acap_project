package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Positions;
import com.acap.api.model.Privileges;

import lombok.Data;

@Data
public class PrivilegesDTO {
  private Positions position;
  private List<Privileges> privileges;
}
