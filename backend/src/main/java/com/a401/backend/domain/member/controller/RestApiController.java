package com.a401.backend.domain.member.controller;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.global.config.security.CurrentUser;
import com.a401.backend.global.config.security.auth.PrincipalDetails;
import com.a401.backend.global.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestApiController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Member getCurrentUser(@CurrentUser PrincipalDetails principalDetails) {
        System.out.println(Long.parseLong(principalDetails.getName()));
        System.out.println(memberRepository.findById(Long.parseLong(principalDetails.getName())));
        return memberRepository.findById(Long.parseLong(principalDetails.getName()))
            .orElseThrow(
                () -> new ResourceNotFoundException("User", "id", principalDetails.getName()));
    }
}
