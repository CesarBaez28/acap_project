package com.acap.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.acap.api.model.Locations;
import com.acap.api.model.Positions;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

  private UUID id;

  private String token;

  private Positions position;

  private Locations location;

  private String username;

  private String employeeNumber;

  private String email;

  private String password;

  private LocalDateTime creationDate;

  private Boolean status;
}
