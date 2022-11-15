package com.a401.backend.domain.dday.api;

import com.a401.backend.domain.dday.application.DdayService;
import com.a401.backend.domain.dday.dto.request.DdayRequestDto;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.TodoItem.global.config.security.CurrentUser;
import com.a401.backend.domain.TodoItem.global.config.security.auth.PrincipalDetails;
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
@RequestMapping("/dday")
public class DdayController {

    private final DdayService ddayService;

    @GetMapping ("")
    public ResponseEntity<?> getDday(@CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            List<DdayResponseDto> dday = ddayService.callDday(member);
            return new ResponseEntity<>(dday, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping ("")
    public ResponseEntity<?> registDday(@RequestBody DdayRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            ddayService.saveDday(request, member);
            return new ResponseEntity<>("성공적으로 저장", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("저장에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping ("")
    public ResponseEntity<?> modifyDday(@RequestBody DdayRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            ddayService.modifyDday(request, member);
            return new ResponseEntity<>("성공적으로 수정", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("수정에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping ("")
    public ResponseEntity<?> deleteDday(@RequestBody DdayRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            if (ddayService.removeDday(request, member))
                return new ResponseEntity<>("성공적으로 삭제", HttpStatus.OK);
            else
                return new ResponseEntity<>("삭제는 본인만 가능합니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("삭제에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

