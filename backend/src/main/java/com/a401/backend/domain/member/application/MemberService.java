package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;

public interface MemberService {
    boolean modifyUser(MemberRequestDto request, Member member);
    void resignUser(ResignRequestDto request, Member member);
}
