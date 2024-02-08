package com.acap.api.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.FieldError;

public class ErrorMessage {
  private String error;
  private List<String> fieldErrors = new ArrayList<>();

  public ErrorMessage(String error) {
    this.error = error;
  }

  public ErrorMessage(String error, List<FieldError> fields) {
    this.error = error;

    for (FieldError err : fields) {
      String errorMessage = err.getField() + ": " + err.getDefaultMessage();
      this.fieldErrors.add(errorMessage);
    }
  }

  public String getError() {
      return error;
  }

  public List<String> getFieldErrors() {
    return fieldErrors;
  }

}
