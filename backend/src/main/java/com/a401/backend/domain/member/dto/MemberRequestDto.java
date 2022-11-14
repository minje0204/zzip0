package com.a401.backend.domain.member.dto;

import com.a401.backend.domain.member.domain.Member;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class MemberRequestDto {
    private String email;
    private String membername;
    private String profileImage;



    @Builder
    public MemberRequestDto(Member member) {
        this.email = member.getEmail();
        this.membername = member.getMembername();
        this.profileImage = member.getProfileImage();
    }
}
