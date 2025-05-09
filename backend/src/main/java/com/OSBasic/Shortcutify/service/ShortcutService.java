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
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShortcutService {

    private final ShortcutRepository shortcutRepository;

    public boolean createAndSaveShortcut(User user, String name, String target, String iconPath) {
        try {
            // URL 자동 보정
            if (!target.startsWith("http://") && !target.startsWith("https://") && target.contains(".")) {
                target = "https://" + target;
            }

            if (iconPath == null || iconPath.isBlank() || iconPath.equalsIgnoreCase("undefined")) {
                iconPath = "";
            }

            boolean isWeb = target.startsWith("http");

            // Node 실행
            String nodePath = "C:\\Program Files\\nodejs\\node.exe";
            String scriptPath = "C:\\Shortcutify\\backend\\node\\create-shortcut.js";

            System.out.println("📦 Node 실행 준비:");
            System.out.println(" - target: " + target);
            System.out.println(" - name: " + name);
            System.out.println(" - iconPath: " + iconPath);

            ProcessBuilder pb = new ProcessBuilder(nodePath, scriptPath, target, name, iconPath);
            pb.directory(new File("C:\\Shortcutify\\backend\\node"));

            Process process = pb.start();

            BufferedReader stdout = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = stdout.readLine()) != null) {
                System.out.println("NODE STDOUT: " + line);
            }

            BufferedReader stderr = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while ((line = stderr.readLine()) != null) {
                System.err.println("NODE STDERR: " + line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("❌ Node.js 프로세스 비정상 종료 (코드: " + exitCode + ")");
                return false;
            }

            // 바로가기 경로 계산
            String extension = isWeb ? ".url" : ".lnk";
            String shortcutPath = System.getenv("USERPROFILE") + "\\Desktop\\" + name + extension;

            Shortcut shortcut = Shortcut.builder()
                    .user(user)
                    .name(name)
                    .target(target)
                    .isWeb(isWeb)
                    .iconPath(iconPath)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            shortcutRepository.save(shortcut);
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
}
