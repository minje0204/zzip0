package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.dday.dto.request.DdayPostRequestDto;
import com.a401.backend.domain.dday.dto.request.DdayPutRequestDto;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.domain.Member;

import java.util.List;

public interface DdayService {
    List<DdayResponseDto> callDday(Member member);
    void saveDday(DdayPostRequestDto request, Member member);
    void modifyDday(DdayPutRequestDto request, Member member);
}
