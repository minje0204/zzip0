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
    private String membername;
    private String roles;
    private String provider;
    private String providerId;
    private boolean isActive;
    private String calendarEmail;
    private String profileImage;
    private String email;
    private Timestamp createDate;

    @Builder
    public MemberResponseDto(Member member) {
        this.membername = member.getMembername();
        this.roles = member.getRoles();
        this.provider = member.getProvider();
        this.providerId = member.getProviderId();
        this.isActive = member.isActive();
        this.calendarEmail = member.getCalendarEmail();
        this.profileImage = member.getProfileImage();
        this.email = member.getEmail();
        this.createDate = member.getCreateDate();
    }
}
