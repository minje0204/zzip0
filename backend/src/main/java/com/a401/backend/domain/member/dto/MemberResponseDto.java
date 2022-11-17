package com.a401.backend.domain.member.dto;

import com.a401.backend.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
public class MemberResponseDto {
    private String memberName;
    private String roles;
    private String provider;
    private String providerId;
    private boolean isActive;
    private String calendarEmail;
    private String introduce;
    private String email;
    private Timestamp createDate;
    private String profileImage;

    @Builder
    public MemberResponseDto(Member member) {
        this.memberName = member.getMemberName();
        this.roles = member.getRoles();
        this.provider = member.getProvider();
        this.providerId = member.getProviderId();
        this.isActive = member.isActive();
        this.calendarEmail = member.getCalendarEmail();
        this.introduce = member.getIntroduce();
        this.email = member.getEmail();
        this.createDate = member.getCreateDate();
        this.profileImage = member.getProfileImage();
    }
}
