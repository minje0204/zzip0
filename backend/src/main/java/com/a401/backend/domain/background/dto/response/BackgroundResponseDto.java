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
    private String bgUrl;
    private String thumbnailUrl;
    private String bgmUrl;
    private String creator;
    private String creatorUrl;

    @Builder
    public BackgroundResponseDto(Background background) {
        this.bgId = background.getBgId();
        this.bgTitle = background.getBgTitle();
        this.bgCategory = background.getBgCategory();
        this.bgUrl = background.getBgUrl();
        this.thumbnailUrl = background.getThumbnailUrl();
        this.bgmUrl = background.getBgmUrl();
        this.creator = background.getCreator();
        this.creatorUrl = background.getCreatorUrl();
    }

}
