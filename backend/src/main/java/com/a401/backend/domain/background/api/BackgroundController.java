package com.a401.backend.domain.background.api;

import com.a401.backend.domain.background.application.BackgroundService;
import com.a401.backend.domain.background.dto.request.BackgroundLikeRegistRequestDto;
import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.BackgroundCategory;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/background")
public class BackgroundController {

    private final BackgroundService bgService;

//    @GetMapping("/{bgId}")
//    public BackgroundResponseDto getBackgroundInfo(@PathVariable("bgId") Long bgId) {
//        return bgService.getBackground(bgId);
//    }

    @GetMapping("/{category}")
    public BackgroundResponseDto getBackgroundInfo(@PathVariable("category") BackgroundCategory category) {
        return bgService.getRandomBg(category);
    }

    @GetMapping ("/like")
    public ResponseEntity<?> listBackgroundLike(@CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            List<BackgroundResponseDto> bglike = bgService.callBackgroundLike(member);
            return new ResponseEntity<>(bglike, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping ("/like")
    public ResponseEntity<?> registBackgroundLike(@RequestBody BackgroundLikeRegistRequestDto bgReq,
                                                   @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            bgService.saveBackgroundLike(bgReq, member);
            return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

