package com.OSBasic.Shortcutify.dto;

import com.OSBasic.Shortcutify.entity.Shortcut;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Getter;

@Getter
public class ShortcutResponseDto {
    private final String path;
    private final String name;
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private final byte[] image;

    public ShortcutResponseDto(Shortcut shortcut) {
        this.path = shortcut.getPath();
        this.name = shortcut.getName();
        this.image = shortcut.getImage();
    }
}
