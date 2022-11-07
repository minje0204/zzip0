package com.a401.backend.domain.follow.dto.response;

import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FollowResponseDto {

    private String memoData;

    @Builder
    public FollowResponseDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
