package com.acap.api.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encrypt {

  private static final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

  private Encrypt() {}

  public static String encryptPassword(String password) {
    return bcrypt.encode(password);
  }

  public static boolean matchesPasswords(String password, String passwordMatch) {
    return bcrypt.matches(password, passwordMatch);
  }
}
