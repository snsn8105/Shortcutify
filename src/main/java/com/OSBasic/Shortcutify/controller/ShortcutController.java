package com.OSBasic.Shortcutify.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OSBasic.Shortcutify.dto.ShortcutRequestDto;
import com.OSBasic.Shortcutify.service.ShortcutService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/shortcuts")
@RequiredArgsConstructor
public class ShortcutController {
    private final ShortcutService shortcutService;

    @PostMapping("/{userId}/create")
    public ResponseEntity<String> create(@PathVariable Long userId, @RequestBody ShortcutRequestDto dto) {
        shortcutService.createShortcut(userId, dto);
        return ResponseEntity.ok("바로가기 생성 완료");
    }
    
}
