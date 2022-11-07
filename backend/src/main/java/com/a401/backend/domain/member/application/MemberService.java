package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberRequestDto;

public interface MemberService {
    boolean modifyUser(MemberRequestDto request, Member member);
}
