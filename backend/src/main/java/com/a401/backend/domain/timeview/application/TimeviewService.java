package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.dto.response.TimeviewResponseDto;

public interface TimeviewService {
    TimeviewResponseDto date(Member member, String date);
    TimeviewResponseDto month(Member member, String date);
    TimeviewResponseDto year(Member member, String date);
}
