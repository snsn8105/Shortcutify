package com.OSBasic.Shortcutify.service;

import java.util.Base64;
import com.OSBasic.Shortcutify.dto.ShortcutDto;
import com.OSBasic.Shortcutify.entity.Shortcut;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.repository.ShortcutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShortcutService {

    private final ShortcutRepository shortcutRepository;

    public boolean createAndSaveShortcut(User user, String name, String target, String iconPath) {
        try {
            // 1) URL 자동 보정
            if (!target.startsWith("http://") && !target.startsWith("https://") && target.contains(".") && !target.startsWith("C:")) {
                target = "https://" + target;
            }

            // 2) iconPath 기본값 처리
            if (iconPath == null || iconPath.isBlank() || iconPath.equalsIgnoreCase("undefined")) {
                // C:/Shortcutify/backend/icons/default.ico 를 미리 만들어 두세요
                iconPath = "C:\\Shortcutify\\backend\\icons\\default.ico";
            } else if (iconPath.startsWith("/icons/")) {
                // 프론트에서 넘어온 "/icons/abc.ico" → 절대경로로
                String fname = Paths.get(iconPath).getFileName().toString(); 
                iconPath = "C:\\Shortcutify\\backend\\icons\\" + fname;
            }
            // 이제 iconPath에 항상 유효한 .ico 경로가 담겨 있음

            boolean isWeb = target.startsWith("http");

            // 3) Node 스크립트 실행
            ProcessBuilder pb = new ProcessBuilder(
                "C:\\Program Files\\nodejs\\node.exe",
                "C:\\Shortcutify\\backend\\node\\create-shortcut.js",
                target, name, iconPath
            );
            pb.directory(new File("C:\\Shortcutify\\backend\\node"));

            Process process = pb.start();
            try (var br = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                br.lines().forEach(System.out::println);
            }
            int exit = process.waitFor();
            if (exit != 0) {
                System.err.println("❌ create-shortcut.js 실패 (code: " + exit + ")");
                return false;
            }

            // 4) DB 저장 (중복이면 생략)
            if (!shortcutRepository.existsByUserAndName(user, name)) {
                Shortcut sc = Shortcut.builder()
                    .user(user)
                    .name(name)
                    .target(target)
                    .isWeb(isWeb)
                    .iconPath(iconPath)    // DB에는 절대경로 또는 이후 가공할 상대경로를 저장
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
                shortcutRepository.save(sc);
            } else {
                System.out.println("⚠️ 이미 존재: " + name + " → DB 저장 생략");
            }

            return true;

        } catch (Exception e) {
            System.err.println("❌ 바로가기 생성 실패:");
            e.printStackTrace();
            return false;
        }
    }


    public List<ShortcutDto> getShortcutsForUser(User user) {
        return shortcutRepository.findByUser(user).stream()
                .map(sc -> ShortcutDto.builder()
                        .name(sc.getName())
                        .target(sc.getTarget())
                        .isWeb(sc.isWeb())
                        .iconPath(sc.getIconPath())
                        .build())
                .collect(Collectors.toList());
    }

    public boolean deleteByUserAndName(User user, String name) {
        Optional<Shortcut> shortcut = shortcutRepository.findByUserAndName(user, name);
        if (shortcut.isPresent()) {
            shortcutRepository.delete(shortcut.get());
            return true;
        }
        return false;
    }

}
