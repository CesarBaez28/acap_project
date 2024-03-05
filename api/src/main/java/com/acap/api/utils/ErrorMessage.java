package com.acap.api.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.FieldError;

/**
 * Clase para representar mensajes de error, incluyendo errores generales y
 * errores de campos.
 */
public class ErrorMessage {

  // Mensaje de error general
  private String error;

  // Lista de mensajes de error de campos
  private List<String> fieldErrors = new ArrayList<>();

  /**
   * Constructor para mensajes de error generales.
   *
   * @param error El mensaje de error general.
   */
  public ErrorMessage(String error) {
    this.error = error;
  }

  /**
   * Constructor para mensajes de error que incluyen información sobre campos con
   * errores.
   *
   * @param error  El mensaje de error general.
   * @param fields Lista de errores de campo.
   */
  public ErrorMessage(String error, List<FieldError> fields) {
    this.error = error;

    // Itera sobre los errores de campo y construye mensajes de error
    for (FieldError err : fields) {
      String errorMessage = err.getField() + ": " + err.getDefaultMessage();
      this.fieldErrors.add(errorMessage);
    }
  }

  /**
   * Obtiene el mensaje de error general.
   *
   * @return El mensaje de error general.
   */
  public String getError() {
    return error;
  }

  /**
   * Obtiene la lista de mensajes de error de campos.
   *
   * @return Lista de mensajes de error de campos.
   */
  public List<String> getFieldErrors() {
    return fieldErrors;
  }
}
