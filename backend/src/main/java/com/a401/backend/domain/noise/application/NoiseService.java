package com.a401.backend.domain.noise.application;

import com.a401.backend.domain.noise.dto.response.NoiseResponseDto;

import java.util.List;

public interface NoiseService {
    List<NoiseResponseDto> callNoiseList();
}
