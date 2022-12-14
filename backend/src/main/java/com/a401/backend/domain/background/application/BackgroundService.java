package com.a401.backend.domain.background.application;

import com.a401.backend.domain.background.dto.request.BackgroundLikeRegistRequestDto;
import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.model.BackgroundCategory;

import java.util.List;

public interface BackgroundService {
    BackgroundResponseDto getBackground(Long bgId);
    BackgroundResponseDto getRandomBg(BackgroundCategory category);
    boolean saveBackgroundLike(BackgroundLikeRegistRequestDto background, Member member);
    void deleteBackgroundLike(BackgroundLikeRegistRequestDto background, Member member);
    List<BackgroundResponseDto> callBackgroundLike(Member member);
    List<BackgroundResponseDto> callThemeBackground(BackgroundCategory category);
}
