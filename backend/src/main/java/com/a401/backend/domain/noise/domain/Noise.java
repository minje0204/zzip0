package com.a401.backend.domain.noise.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Noise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long noiseId;
    @NotNull
    private String noiseTitle;
    @NotNull
    private String noiseUrl;

    @Builder
    public Noise(long noiseId, String noiseTitle, String noiseUrl) {
        this.noiseId = noiseId;
        this.noiseTitle = noiseTitle;
        this.noiseUrl = noiseUrl;
    }

}
