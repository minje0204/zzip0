package com.a401.backend.domain.member.api;

import com.a401.backend.domain.member.application.MemberService;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberModifyRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/user")
public class RestApiController {

    private final MemberService memberService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Member getCurrentUser(@CurrentUser PrincipalDetails principalDetails) {
        return memberService.findMemberByProviderId(principalDetails.getMember().getProviderId());
    }

    @GetMapping(value={"/{pid}","/"})
    @PreAuthorize("hasRole('ROLE_USER')")
    public Member getUser(@PathVariable(required = false) String pid,
                          @CurrentUser PrincipalDetails principalDetails) {
        if (pid == null) {
            return memberService.findMemberByProviderId(principalDetails.getMember().getProviderId());
        }
        return memberService.findMemberByProviderId(pid);
    }

    @PatchMapping("/modify")
    public ResponseEntity<?> modifyUser(@RequestBody MemberModifyRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            if (memberService.modifyUser(request, member)) {
                return new ResponseEntity<>("성공적으로 수정", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("사용자 정보가 일치하지 않습니다.", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("수정에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/withdrawal")
    public ResponseEntity<?> resignUser(@RequestBody ResignRequestDto request,
                                        @CurrentUser PrincipalDetails principalDetails) {
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            memberService.resignUser(request, member);
            return new ResponseEntity<>("성공적으로 탈퇴", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("탈퇴에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> UploadImage(@RequestParam("upload") MultipartFile multipartFile,
                                         @CurrentUser PrincipalDetails principalDetails){
        // 멤버 가져오기
        Member member = principalDetails.getMember();

        try {
            String response = memberService.s3Upload(multipartFile,member);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else return new ResponseEntity<>("업로드에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("호출에 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
