package com.a401.backend.domain.memo.dto.response;

import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MemoResponseDto {

    private String memoData;

    @Builder
    public MemoResponseDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
