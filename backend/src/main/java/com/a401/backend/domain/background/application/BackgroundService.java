package com.a401.backend.domain.background.application;

import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;
import com.a401.backend.domain.model.BackgroundCategory;

public interface BackgroundService {
    BackgroundResponseDto getBackground(Long bgId);
    BackgroundResponseDto getRandomBg(BackgroundCategory category);
}
