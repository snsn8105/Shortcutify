package com.OSBasic.Shortcutify.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OSBasic.Shortcutify.dto.LoginRequestDto;
import com.OSBasic.Shortcutify.dto.SignupRequestDto;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid SignupRequestDto dto) {
        userService.signup(dto);        
        return ResponseEntity.ok("회원가입 완료");
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequestDto dto) {
        String token = userService.login(dto);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMyInfo(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getCurrentUser(username));
    }
}
