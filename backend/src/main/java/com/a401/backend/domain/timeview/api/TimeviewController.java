package com.a401.backend.domain.timeview.api;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.application.TimeviewService;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/timeview")
public class TimeviewController {

    private final TimeviewService tvService;
    private final MemberRepository memberRepository;

    @GetMapping ("/date/{date}")
    public ResponseEntity<?> getDate(@PathVariable("date") String date,
                                     @RequestParam(value = "PID", required = false) String pid,
                                     @CurrentUser PrincipalDetails principalDetails) {
        Member member;
        if (pid!=null) {
            member = memberRepository.findByProviderId(pid).get();
        } else {
            member = principalDetails.getMember();
        }

        if(date.length()!=8) {
            return new ResponseEntity<>("날짜 양식이 적절하지 않습니다. (yyyyMMdd)", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            LocalDate now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDate();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            LocalDate parsedDate = LocalDate.parse(date, formatter);

            TimeviewResponseDto response;

            if (now.equals(parsedDate)) {
                response = tvService.today(member, parsedDate);
            } else {
                response = tvService.date(member, parsedDate);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("No value present")) {
                TimeviewResponseDto response = new TimeviewResponseDto();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/month/{date}")
    public ResponseEntity<?> getMonth(@PathVariable("date") String date,
                                      @RequestParam(value = "PID", required = false) String pid,
                                      @CurrentUser PrincipalDetails principalDetails) {
        Member member;
        if (pid!=null) {
            member = memberRepository.findByProviderId(pid).get();
        } else {
            member = principalDetails.getMember();
        }

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
    public ResponseEntity<?> getYear(@PathVariable("date") String date,
                                     @RequestParam(value = "PID", required = false) String pid,
                                     @CurrentUser PrincipalDetails principalDetails) {
        Member member;
        if (pid!=null) {
            member = memberRepository.findByProviderId(pid).get();
        } else {
            member = principalDetails.getMember();
        }

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

    @GetMapping ("/day")
    public ResponseEntity<?> getDays(@RequestParam(name = "startDate") String start,
                                     @RequestParam(name = "endDate") String end,
                                     @RequestParam(value = "PID", required = false) String pid,
                                     @CurrentUser PrincipalDetails principalDetails) {
        Member member;
        if (pid!=null) {
            member = memberRepository.findByProviderId(pid).get();
        } else {
            member = principalDetails.getMember();
        }

        try {
            List<TimeviewResponseDto> response = tvService.days(member, start, end);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("No value present")) {
                TimeviewResponseDto response = new TimeviewResponseDto();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

