package com.OSBasic.Shortcutify.controller;

import com.OSBasic.Shortcutify.service.IconFinderService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/icons")
public class IconFinderController {

    private final IconFinderService iconfinderService;

    public IconFinderController(IconFinderService iconfinderService) {
        this.iconfinderService = iconfinderService;
    }


    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchIcons(@RequestParam String query) {
        List<Map<String, Object>> result = iconfinderService.searchIconsPreview(query);
        return ResponseEntity.ok(result);
    }

        @PostMapping("/url-upload")
    public ResponseEntity<String> uploadByUrl(@RequestParam("imageUrl") String imageUrl) {
        try {
            String iconPath = iconfinderService.downloadAndConvertIcon(imageUrl);
            return ResponseEntity.ok(iconPath);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("변환 실패: " + e.getMessage());
        }
    }
}
