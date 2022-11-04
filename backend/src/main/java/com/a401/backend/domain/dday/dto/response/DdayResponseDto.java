package com.a401.backend.domain.dday.dto.response;

import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class DdayResponseDto {

    private String memoData;

    @Builder
    public DdayResponseDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
