package com.OSBasic.Shortcutify.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OSBasic.Shortcutify.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
