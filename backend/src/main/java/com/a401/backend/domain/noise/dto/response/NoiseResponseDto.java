package com.a401.backend.domain.noise.dto.response;

import com.a401.backend.domain.noise.domain.Noise;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class NoiseResponseDto {

    private long noiseId;
    private String noiseTitle;
    private String noiseUrl;

    @Builder
    public NoiseResponseDto(Noise noise) {
        this.noiseId = noise.getNoiseId();
        this.noiseTitle = noise.getNoiseTitle();
        this.noiseUrl = noise.getNoiseUrl();
    }

}
