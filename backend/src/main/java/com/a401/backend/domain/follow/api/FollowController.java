package com.a401.backend.domain.follow.api;

import com.a401.backend.domain.follow.application.FollowService;
import com.a401.backend.domain.follow.dto.response.FollowResponseDto;
import com.a401.backend.domain.member.domain.Member;
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
@RequestMapping("/follow")
public class FollowController {

    private final FollowService flService;

    @GetMapping ("/followee")
    public ResponseEntity<?> getFollowee(@CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            List<FollowResponseDto> response = flService.followeeList(member);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping ("/follower")
    public ResponseEntity<?> getFollower(@CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            List<FollowResponseDto> response = flService.followerList(member);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping ("/following/{request}")
    public ResponseEntity<?> connectFollow(@PathVariable("request") String request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            if(flService.connect(request,member)) {
                return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("이미 등록한 회원입니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping ("/unfollow/{request}")
    public ResponseEntity<?> disconnectFollow(@PathVariable("request") String request,
                                           @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            if(flService.disconnect(request,member)) {
                return new ResponseEntity<>("성공적으로 해제", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("팔로우중이 아닌 회원을 팔로우 해제 시도했습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("해제에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

