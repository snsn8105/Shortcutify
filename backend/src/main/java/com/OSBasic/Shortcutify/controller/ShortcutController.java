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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.getCurrentUser(auth.getName());

        boolean mainOk = false;
        boolean exeOk  = false;

        // 1) 웹 바로가기 (URL) 분기
        if (dto.getUrl() != null && !dto.getUrl().isBlank()) {
            mainOk = shortcutService.createAndSaveShortcut(
                currentUser,
                dto.getName(),
                dto.getUrl(),
                dto.getIconPath()
            );
        }

        // 2) Exe 바로가기 분기 (이름 뒤에 "_exe" 추가)
        if (dto.getExePath() != null && !dto.getExePath().isBlank()) {
            exeOk = shortcutService.createAndSaveShortcut(
                currentUser,
                dto.getName() ,   // ← 여기!!
                dto.getExePath(),
                dto.getIconPath()
            );
        }

        // 3) 두 분기 중 하나라도 성공이면 200, 아니면 500
        if (mainOk || exeOk) {
            return ResponseEntity.ok("바로가기 생성 완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("바로가기 생성 실패: [웹 ok=" + mainOk + ", exe ok=" + exeOk + "]");
        }
    }



    @GetMapping
    public ResponseEntity<List<ShortcutDto>> getUserShortcuts(Authentication auth) {
        String username = auth.getName();
        User user = userService.getCurrentUser(username);

        List<ShortcutDto> result = shortcutService.getShortcutsForUser(user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteShortcut(@PathVariable String name, Authentication auth) {
        String username = auth.getName();
        User user = userService.getCurrentUser(username);

        boolean deleted = shortcutService.deleteByUserAndName(user, name);
        if (deleted) {
            return ResponseEntity.ok("삭제 완료");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제 실패");
        }
    }

    
}
