package com.acap.api.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.acap.api.model.Locations;
import com.acap.api.model.Positions;
import com.acap.api.model.User;
import com.acap.api.repository.LocationRepository;
import com.acap.api.repository.PositionsRepository;
import com.acap.api.repository.UserRepository;
import com.acap.api.utils.Encrypt;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final PositionsRepository positionsRepository;
  private final LocationRepository locationsRepository;
  
  public UserService (UserRepository userRepository, PositionsRepository positionsRepository, LocationRepository locationRepository) {
    this.positionsRepository = positionsRepository;
    this.userRepository = userRepository;
    this.locationsRepository = locationRepository;
  }

  public List<User> findUsersByStatus (boolean status, UUID userId) {
    return userRepository.findByStatus(status, userId);
  }

  public List<User> searchUsers (String search, UUID userId) {
    return userRepository.search(search, userId);
  }

  public Optional<User> findUserById (UUID id) {
    return userRepository.findById(id);
  }

  public User saveUser (User user) {
    Optional<Positions> positionData = positionsRepository.findById(user.getPosition().getId());
    Optional<Locations> locationsData = locationsRepository.findById(user.getLocation().getId()); 
    Optional<User> userData;

    if (positionData.isPresent()) { user.setPosition(positionData.get()); }
    if (locationsData.isPresent()) { user.setLocation(locationsData.get()); }

    if ("".equals(user.getPassword())) {  
      userData = userRepository.findById(user.getId());
      if (userData.isPresent()) { user.setPassword(userData.get().getPassword()); }
      return userRepository.save(user);
    }
  
    String encryptedPassword = Encrypt.encryptPassword(user.getPassword());
    user.setPassword(encryptedPassword);
    return userRepository.save(user);
  }

  public User changePassword (UUID userId, String currentPassword, String newPassword) {
    Optional<User> userData = userRepository.findById(userId);
    String passwordInDB = "";

    if (userData.isPresent()) { passwordInDB = userData.get().getPassword(); }
    
    if (!Encrypt.matchesPasswords(currentPassword, passwordInDB)) {
      return null;
    }

    String encryptedPassword = Encrypt.encryptPassword(newPassword);
    userData.get().setPassword(encryptedPassword);
    userRepository.changePassword(userId, encryptedPassword);
    return userData.get();
  }

  public void updateStatus (UUID id, boolean state) {
    userRepository.updateStatus(id, state);
  }

  public User getUserByEmployeeNumber (User user) {
    User userData = userRepository.findByEmployeeNumber(user.getEmployeeNumber());

    // Check if the user exist
    if (userData == null) { return null; }

    // Check if the user is active
    if (Boolean.FALSE.equals(userData.getStatus())) { return null; }

    // Check if the password is correct
    if (!Encrypt.matchesPasswords(user.getPassword(), userData.getPassword())) {
      return null;
    }

    return userData;
  }
}
