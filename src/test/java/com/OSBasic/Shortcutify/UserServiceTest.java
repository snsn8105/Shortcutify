package com.OSBasic.Shortcutify;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.OSBasic.Shortcutify.dto.SignupRequestDto;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.repository.UserRepository;
import com.OSBasic.Shortcutify.service.UserService;

@SpringBootTest(classes = ShortcutifyApplication.class)
@Transactional
class UserServiceTest {

    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    @Test
    void signupTest() {
        SignupRequestDto dto = new SignupRequestDto("test", "1234", "홍길동", "test@example.com", "www.example.com");
        userService.signup(dto);

        User saved = userRepository.findByUsername("test").orElseThrow();
        assertEquals("홍길동", saved.getName());
    }
}
