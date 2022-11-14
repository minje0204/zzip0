package com.a401.backend.domain.timelog.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.dto.request.TimelogRequestDto;
import com.a401.backend.domain.timelog.dto.response.TimelogResponseDto;

import javax.transaction.Transactional;

public interface TimelogService {
    TimelogResponseDto start(TimelogRequestDto request, Member member);

    @Transactional
    void finish(TimelogRequestDto request, Member member);

    @Transactional
    void finishTimelogs(Member member);
}
