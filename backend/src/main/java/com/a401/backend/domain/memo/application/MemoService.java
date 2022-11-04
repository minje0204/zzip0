package com.a401.backend.domain.memo.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import com.a401.backend.domain.noise.dto.response.NoiseResponseDto;

import java.util.List;

public interface MemoService {
    MemoResponseDto callMemo(Member member);
    void saveMemo(MemoRequestDto req, Member member);
}
