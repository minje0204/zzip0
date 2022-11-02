package com.a401.backend.domain.background.dto.response;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.model.BackgroundCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BackgroundResponseDto {

    private long bgId;
    private String bgTitle;
    private BackgroundCategory bgCategory;
    private String thumbnailUrl;
    private String bgmUrl;

    @Builder
    public BackgroundResponseDto(Background background) {
        this.bgId = background.getBgId();
        this.bgTitle = background.getBgTitle();
        this.bgCategory = background.getBgCategory();
        this.thumbnailUrl = background.getThumbnailUrl();
        this.bgmUrl = background.getBgmUrl();
    }

}
