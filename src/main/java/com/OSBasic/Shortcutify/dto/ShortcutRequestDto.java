package com.OSBasic.Shortcutify.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
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
    private String path;
    private String name;
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;
}
