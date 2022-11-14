package com.a401.backend.domain.timeview.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timeview.dto.response.DateResponseDto;

import java.util.List;

public interface TimeviewService {
    List<DateResponseDto> date(Member member, String date);
}
