package com.OSBasic.Shortcutify.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ShortcutDto {
    private String name;
    private String target;
    private boolean isWeb;
    private String iconPath;
}
