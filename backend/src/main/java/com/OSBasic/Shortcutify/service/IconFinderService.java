package com.OSBasic.Shortcutify.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.io.*;
import java.net.URI;
import java.net.URL;
import java.nio.file.*;


import org.json.JSONObject;

@Service
public class IconFinderService {

    @Value("${iconfinder.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Map<String, Object>> searchIconsPreview(String query) {
        String url = UriComponentsBuilder
                .fromUriString("https://api.iconfinder.com/v4/icons/search")
                .queryParam("query", query)
                .queryParam("count", 10)
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        List<Map<String, Object>> resultList = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode icons = root.path("icons");

            for (JsonNode icon : icons) {
                JsonNode rasterSizes = icon.path("raster_sizes");
                if (rasterSizes.isArray() && rasterSizes.size() > 0) {
                    JsonNode lastSize = rasterSizes.get(rasterSizes.size() - 1); // 가장 큰 사이즈
                    JsonNode formats = lastSize.path("formats");
                    if (formats.isArray() && formats.size() > 0) {
                        String previewUrl = formats.get(0).path("preview_url").asText();

                        Map<String, Object> iconData = new HashMap<>();
                        iconData.put("previewUrl", previewUrl);

                        List<String> tagList = new ArrayList<>();
                        for (JsonNode tag : icon.path("tags")) {
                            tagList.add(tag.asText());
                        }
                        iconData.put("tags", tagList);

                        resultList.add(iconData);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resultList;
    }

        public String downloadAndConvertIcon(String imageUrl) throws IOException, InterruptedException {
        // 1. 파일명 생성
        String baseName = UUID.randomUUID().toString();
        Path pngPath = Paths.get("uploads", baseName + ".png");
        Path icoPath = Paths.get("icons", baseName + ".ico");

        // 2. 안전한 방식으로 이미지 다운로드 (URL 생성자 deprecated 대체)
        URI uri = URI.create(imageUrl);
        URL url = uri.toURL();

        try (InputStream in = url.openStream()) {
            Files.copy(in, pngPath, StandardCopyOption.REPLACE_EXISTING);
        }

        // 3. Node.js 스크립트 실행
        ProcessBuilder pb = new ProcessBuilder("node", "node/convert-to-ico.js",
                pngPath.toAbsolutePath().toString(),
                icoPath.toAbsolutePath().toString());
        pb.redirectErrorStream(true);
        Process process = pb.start();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            reader.lines().forEach(System.out::println);
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("아이콘 변환 실패");
        }

        // 4. 반환할 .ico 경로 (웹 기준 상대 경로)
        return "/icons/" + baseName + ".ico";
    }

}
