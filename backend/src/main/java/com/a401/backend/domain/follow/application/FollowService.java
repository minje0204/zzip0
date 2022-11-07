package com.a401.backend.domain.follow.application;

import com.a401.backend.domain.follow.dto.request.FollowRequestDto;
import com.a401.backend.domain.follow.dto.response.FollowResponseDto;
import com.a401.backend.domain.member.domain.Member;

import java.util.List;

public interface FollowService {
    boolean connect(FollowRequestDto request, Member member);
    boolean disconnect(FollowRequestDto request, Member member);
    List<FollowResponseDto> followList(Member member);
}
