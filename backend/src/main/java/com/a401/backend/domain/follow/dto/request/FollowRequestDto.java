package com.a401.backend.domain.follow.dto.request;

import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FollowRequestDto {

    private String memoData;

    @Builder
    public FollowRequestDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
