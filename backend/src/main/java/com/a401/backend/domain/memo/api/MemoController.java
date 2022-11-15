package com.a401.backend.domain.memo.api;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.application.MemoService;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
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
@RequestMapping("/memo")
public class MemoController {

    private final MemoService memoService;

    @GetMapping ("")
    public ResponseEntity<?> getMemo(@CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            MemoResponseDto memo = memoService.callMemo(member);
            return new ResponseEntity<>(memo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping ("")
    public ResponseEntity<?> recordMemo(@RequestBody MemoRequestDto memoReq,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            memoService.saveMemo(memoReq,member);
            return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

