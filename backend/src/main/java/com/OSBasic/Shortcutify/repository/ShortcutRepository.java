package com.OSBasic.Shortcutify.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OSBasic.Shortcutify.entity.Shortcut;
import com.OSBasic.Shortcutify.entity.User;

public interface ShortcutRepository extends JpaRepository<Shortcut, Long>{
    List<Shortcut> findByUserId(Long userId);

    List<Shortcut> findByUser(User user);

    Optional<Shortcut> findByUserAndName(User user, String name);

    boolean existsByUserAndName(User user, String name);

}
