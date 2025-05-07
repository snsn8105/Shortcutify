package com.OSBasic.Shortcutify;

import com.OSBasic.Shortcutify.dto.ShortcutRequestDto;
import com.OSBasic.Shortcutify.entity.Shortcut;
import com.OSBasic.Shortcutify.entity.User;
import com.OSBasic.Shortcutify.repository.ShortcutRepository;
import com.OSBasic.Shortcutify.repository.UserRepository;
import com.OSBasic.Shortcutify.service.ShortcutService;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = ShortcutifyApplication.class)
@Transactional
public class ShortcutServiceTest {

    @Autowired ShortcutService shortcutService;
    @Autowired ShortcutRepository shortcutRepository;
    @Autowired UserRepository userRepository;

    @Test
    void shortcutTest() {
        // 1. 테스트용 유저 등록
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("testpass");
        user.setName("테스터");
        user.setEmail("test@example.com");
        user.setUrl("http://myprofile.com");

        user = userRepository.save(user); // 저장 후 id 자동 생성

        // 2. ShortcutRequestDto 생성
        ShortcutRequestDto dto = new ShortcutRequestDto("https://example.com", "예제", "icon.png");

        // 3. Shortcut 생성
        shortcutService.createShortcut(user.getId(), dto);

        // 4. DB에서 저장된 Shortcut 확인
        List<Shortcut> shortcuts = shortcutRepository.findByUserId(user.getId());

        assertThat(shortcuts).isNotEmpty();
        assertThat(shortcuts.get(0).getPath()).isEqualTo("https://example.com");
        assertThat(shortcuts.get(0).getName()).isEqualTo("예제");
        assertThat(shortcuts.get(0).getImage()).isEqualTo("icon.png");
        assertThat(shortcuts.get(0).getUser().getUsername()).isEqualTo("testuser");
    }
}
