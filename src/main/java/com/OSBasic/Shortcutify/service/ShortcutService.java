package com.OSBasic.Shortcutify.service;

import org.springframework.stereotype.Service;

import com.OSBasic.Shortcutify.dto.ShortcutRequestDto;
import com.OSBasic.Shortcutify.repository.ShortcutRepository;
import com.OSBasic.Shortcutify.repository.UserRepository;
import com.OSBasic.Shortcutify.entity.Shortcut;
import com.OSBasic.Shortcutify.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShortcutService {
    private final ShortcutRepository shortcutRepository;
    private final UserRepository userRepository;

    public void createShortcut(Long userId, ShortcutRequestDto dto){
        User user = userRepository.findById(userId).orElseThrow();
        Shortcut shortcut = new Shortcut();
        shortcut.setPath(dto.getPath());
        shortcut.setName(dto.getName());
        shortcut.setImage(dto.getImage());
        shortcut.setUser(user);
        shortcutRepository.save(shortcut);
    }
}
