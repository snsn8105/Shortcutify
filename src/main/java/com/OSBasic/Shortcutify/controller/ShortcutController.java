package com.OSBasic.Shortcutify.controller;

import com.OSBasic.Shortcutify.dto.ShortcutRequestDto;
import com.OSBasic.Shortcutify.dto.ShortcutResponseDto;
import com.OSBasic.Shortcutify.service.ShortcutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/shortcuts")
@RequiredArgsConstructor
public class ShortcutController {

    private final ShortcutService shortcutService;

    @PostMapping("/{userId}/create")
    public ResponseEntity<String> createShortcut(
            @PathVariable Long userId,
            @RequestParam String path,
            @RequestParam String name,
            @RequestParam("image") MultipartFile imageFile) throws IOException {

        byte[] imageBytes = imageFile.getBytes();
        ShortcutRequestDto dto = new ShortcutRequestDto(path, name, imageBytes);
        shortcutService.createShortcut(userId, dto);
        return ResponseEntity.ok("바로가기 생성 완료");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ShortcutResponseDto>> getShortcuts(@PathVariable Long userId) {
        return ResponseEntity.ok(shortcutService.getShortcuts(userId));
    }
}
