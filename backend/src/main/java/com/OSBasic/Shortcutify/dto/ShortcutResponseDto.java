package com.OSBasic.Shortcutify.dto;

import com.OSBasic.Shortcutify.entity.Shortcut;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ShortcutResponseDto {

    private final Long id;
    private final String name;
    private final String target;
    private final boolean isWeb;
    private final String iconPath;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public ShortcutResponseDto(Shortcut shortcut) {
        this.id = shortcut.getId();
        this.name = shortcut.getName();
        this.target = shortcut.getTarget();
        this.isWeb = shortcut.isWeb();
        this.iconPath = shortcut.getIconPath();
        this.createdAt = shortcut.getCreatedAt();
        this.updatedAt = shortcut.getUpdatedAt();
    }
}
