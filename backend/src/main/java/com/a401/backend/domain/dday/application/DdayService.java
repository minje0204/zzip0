package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.dday.dto.request.DdayRequestDto;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.domain.Member;

import java.util.List;

public interface DdayService {
    List<DdayResponseDto> callDday(Member member);
    void saveDday(DdayRequestDto request, Member member);
    void modifyDday(DdayRequestDto request, Member member);
    boolean removeDday(DdayRequestDto request, Member member);
}
