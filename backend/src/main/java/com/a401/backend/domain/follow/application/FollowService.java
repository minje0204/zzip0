package com.a401.backend.domain.follow.application;

import com.a401.backend.domain.follow.dto.request.FollowRequestDto;
import com.a401.backend.domain.member.domain.Member;

public interface FollowService {
    boolean connect(FollowRequestDto request, Member member);
}
