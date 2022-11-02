package com.a401.backend.domain.background.api;

import com.a401.backend.domain.Room.application.RoomHistoryService;
import com.a401.backend.domain.Room.application.RoomMembersService;
import com.a401.backend.domain.Room.application.RoomService;
import com.a401.backend.domain.Room.domain.Room;
import com.a401.backend.domain.Room.dto.request.RoomRequestDto;
import com.a401.backend.domain.Room.dto.response.RoomResponseDto;
import com.a401.backend.domain.background.application.BackgroundService;
import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.RoomAction;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/background")
public class BackgroundController {

    private final BackgroundService bgService;

    @GetMapping("/{bgId}")
    public BackgroundResponseDto getBackgroundInfo(@PathVariable("bgId") Long bgId) {
        return bgService.getBackground(bgId);
    }

}

