package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.UserToken;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

  @Query("SELECT t FROM UserToken t " + 
         "JOIN t.user u " + 
         "WHERE u.id =: userId AND t.revoked = false")
  List<UserToken> findByUserId(@Param("userId") UUID userId);

  Optional<UserToken> findByToken(String token);
}
