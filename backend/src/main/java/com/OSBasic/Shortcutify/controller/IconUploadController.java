package com.OSBasic.Shortcutify.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
@RequestMapping("/api/icons")
// 사용자 지정 이미지를 업로드해 .ico 파일로 변환환
public class IconUploadController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAndConvertIcon(@RequestParam("image") MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
    
            // 1. 저장 경로
            File outputDir = new File("C:/Shortcutify/backend/icons/");
            if (!outputDir.exists()) outputDir.mkdirs();
    
            // 2. 파일 이름 구성
            String baseName = originalFilename.replaceAll("\\..*$", "") + "_" + System.currentTimeMillis();
            File outputFile = new File(outputDir, baseName + ".ico");
    
            // 3. 확장자 판단
            if (extension.equals("ico")) {
                // 그대로 저장만 함
                file.transferTo(outputFile);
                System.out.println("✅ .ico 직접 업로드 처리 완료");
            } else {
                // 변환 경로로 PNG 저장
                File tempPng = new File("C:/Shortcutify/backend/uploads/", baseName + ".png");
                file.transferTo(tempPng);
    
                // Node.js로 변환 실행
                String node = "C:/Program Files/nodejs/node.exe";
                String script = "C:/Shortcutify/backend/node/convert-to-ico.js";
    
                ProcessBuilder pb = new ProcessBuilder(node, script, tempPng.getAbsolutePath(), outputFile.getAbsolutePath());
                pb.redirectErrorStream(true);
                Process process = pb.start();
    
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) System.out.println("NODE: " + line);
    
                int exit = process.waitFor();
                if (exit != 0) throw new RuntimeException("Node.js ico 변환 실패");
            }
    
            return ResponseEntity.ok(outputFile.getAbsolutePath());
    
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("아이콘 처리 실패: " + e.getMessage());
        }
    }
    
}
