package com.a401.backend.domain.timelog.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dto.request.TimelogRequestDto;
import com.a401.backend.domain.timelog.dto.response.TimelogResponseDto;

public interface TimelogService {
    TimelogResponseDto start(TimelogRequestDto request, Member member);
}
