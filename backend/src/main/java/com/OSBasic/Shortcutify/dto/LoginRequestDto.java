package com.OSBasic.Shortcutify.dto;

import jakarta.validation.constraints.NotBlank;
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
public class LoginRequestDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
