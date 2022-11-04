package com.a401.backend.domain.dday.dto.request;

import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class DdayRequestDto {

    private String memoData;

    @Builder
    public DdayRequestDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
