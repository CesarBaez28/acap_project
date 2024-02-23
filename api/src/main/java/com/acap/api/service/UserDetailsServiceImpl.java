package com.acap.api.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.User;
import com.acap.api.repository.PositionsPrivilegesRepository;
import com.acap.api.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;
  private final PositionsPrivilegesRepository positionsPrivilegesRepository;

  public UserDetailsServiceImpl (UserRepository userRepository, PositionsPrivilegesRepository positionsPrivilegesRepository) {
    this.userRepository = userRepository;
    this.positionsPrivilegesRepository = positionsPrivilegesRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmployeeNumber(username);
    List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesRepository.findAllByPositions(user.getPosition());

    List<String> privileges = new ArrayList<>();
    for (PositionsPrivileges element : positionsPrivileges) {
      privileges.add(element.getPrivileges().getPrivilege());
    }

    Collection<? extends GrantedAuthority> authorities = privileges
       .stream()
       .map(privilege -> new SimpleGrantedAuthority("ROLE_".concat(privilege)))
       .collect(Collectors.toSet());

    return new org.springframework.security.core.userdetails.User(user.getEmployeeNumber(),
      user.getPassword(),
      true, 
      true, 
      true,
      true,
      authorities);
  }  
}
