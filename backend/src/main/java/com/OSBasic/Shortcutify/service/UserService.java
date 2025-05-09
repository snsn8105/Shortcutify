package com.OSBasic.Shortcutify.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.OSBasic.Shortcutify.dto.LoginRequestDto;
import com.OSBasic.Shortcutify.dto.SignupRequestDto;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.jwt.JwtTokenProvider;
import com.OSBasic.Shortcutify.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public void signup(SignupRequestDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);
    }

    public String login(LoginRequestDto dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사용자입니다."));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("비밀번호 불일치");
        }
        return jwtTokenProvider.generateToken(user.getUsername());
    }

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("해당 사용자가 없습니다."));
    }
    
}
