package com.a401.backend.domain.background.application;

import com.a401.backend.domain.background.dto.response.BackgroundResponseDto;

public interface BackgroundService {
    BackgroundResponseDto getBackground(Long bgId);
}
