package com.a401.backend.domain.follow.application;

import com.a401.backend.domain.follow.dto.response.FollowResponseDto;
import com.a401.backend.domain.member.domain.Member;

import java.util.List;

public interface FollowService {
    boolean connect(String request, Member member);
    boolean disconnect(String request, Member member);
    List<FollowResponseDto> followeeList(Member member);
    List<FollowResponseDto> followerList(Member member);
}
