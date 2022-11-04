package com.a401.backend.domain.memo.dto.request;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.domain.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class MemoRequestDto {

    private String memoData;

    @Builder
    public MemoRequestDto(Memo memo) {
        this.memoData = memo.getMemoData();
    }

}
