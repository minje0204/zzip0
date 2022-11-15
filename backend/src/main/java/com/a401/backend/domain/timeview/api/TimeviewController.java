package com.a401.backend.domain.timeview.api;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.application.TimeviewService;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;
import com.a401.backend.domain.TodoItem.global.config.security.CurrentUser;
import com.a401.backend.domain.TodoItem.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/timeview")
public class TimeviewController {

    private final TimeviewService tvService;

    @GetMapping ("/date/{date}")
    public ResponseEntity<?> getDate(@PathVariable("date") String date, @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            TimeviewResponseDto response = tvService.date(member, date);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("No value present")) {
                TimeviewResponseDto response = new TimeviewResponseDto();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/month/{date}")
    public ResponseEntity<?> getMonth(@PathVariable("date") String date, @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        if(date.length()!=6) {
            return new ResponseEntity<>("날짜 양식이 적절하지 않습니다. (yyyyMM)", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            TimeviewResponseDto response = tvService.month(member, date);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("No value present")) {
                TimeviewResponseDto response = new TimeviewResponseDto();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/year/{date}")
    public ResponseEntity<?> getYear(@PathVariable("date") String date, @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        if(date.length()!=4) {
            return new ResponseEntity<>("날짜 양식이 적절하지 않습니다. (yyyy)", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            TimeviewResponseDto response = tvService.year(member, date);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("No value present")) {
                TimeviewResponseDto response = new TimeviewResponseDto();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

