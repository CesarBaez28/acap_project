package com.acap.api.dto;

import java.util.List;
import java.util.UUID;

import com.acap.api.model.Locations;

import lombok.Data;

@Data
public class ChangeLocationsDTO {
  private List<UUID> ids;
  private Locations location;
}
