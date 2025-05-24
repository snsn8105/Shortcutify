package com.OSBasic.Shortcutify.controller;

import com.OSBasic.Shortcutify.dto.ShortcutDto;
import com.OSBasic.Shortcutify.dto.ShortcutRequestDto;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.service.ShortcutService;
import com.OSBasic.Shortcutify.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shortcuts")
public class ShortcutController {

    private final ShortcutService shortcutService;
    private final UserService userService;

   @PostMapping("/create")
    public ResponseEntity<String> createShortcut(@RequestBody ShortcutRequestDto dto) {
        // 현재 로그인된 사용자의 username 추출
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();  // email 또는 사용자 이름

        User currentUser = userService.getCurrentUser(username);  // ✔️ 파라미터 넘김

        boolean successMain = shortcutService.createAndSaveShortcut(
                currentUser,
                dto.getName(),
                dto.getUrl(),
                dto.getIconPath()
        );

        boolean successExe = true;
        if (dto.getExePath() != null && !dto.getExePath().isBlank()) {
            successExe = shortcutService.createAndSaveShortcut(
                    currentUser,
                    dto.getName() + "_exe",
                    dto.getExePath(),
                    dto.getIconPath()
            );
        }

        if (successMain && successExe) {
            return ResponseEntity.ok("바로가기 생성 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("바로가기 생성 실패");
        }
    }

    @GetMapping
    public ResponseEntity<List<ShortcutDto>> getUserShortcuts(Authentication auth) {
        String username = auth.getName();
        User user = userService.getCurrentUser(username);

        List<ShortcutDto> result = shortcutService.getShortcutsForUser(user);
        return ResponseEntity.ok(result);
    }
}
