package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Evidence;
import com.acap.api.model.Folders;

import lombok.Data;

@Data
public class EvidenceDTO {
  private Folders folders;
  private List<Evidence> evidence;
}
