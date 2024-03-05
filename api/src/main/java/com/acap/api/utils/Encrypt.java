package com.acap.api.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Clase utilitaria para el cifrado y comparación de contraseñas utilizando
 * BCrypt.
 */
public class Encrypt {

  // Instancia de BCryptPasswordEncoder para el cifrado y descifrado de
  // contraseñas
  private static final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

  // Constructor privado para evitar instancias de la clase
  private Encrypt() {
  }

  /**
   * Cifra la contraseña utilizando BCrypt.
   *
   * @param password La contraseña a cifrar.
   * @return La contraseña cifrada.
   */
  public static String encryptPassword(String password) {
    return bcrypt.encode(password);
  }

  /**
   * Compara una contraseña sin cifrar con una contraseña cifrada para verificar
   * si coinciden.
   *
   * @param password      La contraseña sin cifrar.
   * @param passwordMatch La contraseña cifrada a comparar.
   * @return true si las contraseñas coinciden, false en caso contrario.
   */
  public static boolean matchesPasswords(String password, String passwordMatch) {
    return bcrypt.matches(password, passwordMatch);
  }
}
