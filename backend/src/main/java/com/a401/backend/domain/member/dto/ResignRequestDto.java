package com.a401.backend.domain.member.dto;

import com.a401.backend.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ResignRequestDto {
    private boolean isActive;

    @Builder
    public ResignRequestDto(Member member) {
        this.isActive = member.isActive();
    }
}
