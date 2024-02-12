package com.acap.api.dto;

import lombok.Data;

@Data
public class SignatureUploadDTO {

  private String directoryName;
  private String base64Image;
}
