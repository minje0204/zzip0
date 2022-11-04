package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;

public interface DdayService {
    MemoResponseDto callMemo(Member member);
    void saveMemo(MemoRequestDto req, Member member);
}
