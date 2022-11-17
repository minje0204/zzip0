package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberModifyRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    boolean modifyUser(MemberModifyRequestDto request, Member member);

    void resignUser(ResignRequestDto request, Member member);

    String s3Upload(MultipartFile multipartFile, Member member);

    Member findMemberByProviderId(String id);
    
    Member findMemberByEmail(String email);
}
