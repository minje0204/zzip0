package com.a401.backend.domain.background.dto.request;

import com.a401.backend.domain.background.domain.Background;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class BackgroundLikeRegistRequestDto {

    private long bgId;

    @Builder
    public BackgroundLikeRegistRequestDto(Background background) {
        this.bgId = background.getBgId();
    }

}
