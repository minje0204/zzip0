package com.a401.backend.domain.background.domain;

import com.a401.backend.domain.model.BackgroundCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Background {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bgId;
    @NotNull
    private String bgTitle;
    @NotNull
    @Enumerated(EnumType.STRING)
    private BackgroundCategory bgCategory;
    @NotNull
    private String bgUrl;
    @NotNull
    private String thumbnailUrl;
    @NotNull
    private String bgmUrl;

    @Builder
    public Background(long bgId, String bgTitle, BackgroundCategory bgCategory,
                      String bgUrl, String thumbnailUrl, String bgmUrl) {
        this.bgId = bgId;
        this.bgTitle = bgTitle;
        this.bgCategory = bgCategory;
        this.bgUrl = bgUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.bgmUrl = bgmUrl;
    }

}
