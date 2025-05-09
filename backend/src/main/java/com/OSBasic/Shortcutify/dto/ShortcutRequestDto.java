package com.OSBasic.Shortcutify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShortcutRequestDto {
    private String name;
    private String url;        // 웹 주소 또는 실행 파일 경로
    private String exePath;    // 선택적 실행파일 경로
    private String iconPath;   // 선택적 아이콘 경로
}
