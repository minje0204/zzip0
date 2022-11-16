package com.a401.backend.domain.follow.dto.response;

import com.a401.backend.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FollowResponseDto {

    private String providerId;
    private String membername;
    private String profileImage;

    @Builder
    public FollowResponseDto(Member member) {
        this.providerId = member.getProviderId();
        this.membername = member.getMemberName();
        this.profileImage = member.getIntroduce();
    }

}
