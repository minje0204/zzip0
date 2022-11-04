package com.a401.backend.domain.timelog.api;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.application.TimelogService;
import com.a401.backend.domain.timelog.dto.request.TimelogRequestDto;
import com.a401.backend.domain.timelog.dto.response.TimelogResponseDto;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/timelog")
public class TimelogController {

    private final TimelogService tlService;

    @PostMapping ("")
    public ResponseEntity<?> startLog(@RequestBody TimelogRequestDto request,
                                      @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            TimelogResponseDto response = tlService.start(request, member);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

