package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Cintas;
import com.acap.api.model.Shipments;

import lombok.Data;

@Data
public class ShipmentDTO {
  
  private Shipments shipment;
  private List<Cintas> cintas; 
}
