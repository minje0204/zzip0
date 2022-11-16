package com.a401.backend.domain.member.dto;

import com.a401.backend.domain.member.domain.Member;
import lombok.*;
import org.springframework.util.StringUtils;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class MemberModifyRequestDto {
    private String email;
    private String memberName;
    private String introduce;

    public boolean isEmailNotNull(){
        return StringUtils.hasText(email);
    }
    public boolean isMemberNameNotNull(){
        return StringUtils.hasText(memberName);
    }
    public boolean isIntroduceNotNull(){
        return StringUtils.hasText(introduce);
    }
}
