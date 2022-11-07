package com.a401.backend.domain.member.application;

import com.a401.backend.domain.dday.dao.DdayRepository;
import com.a401.backend.domain.dday.domain.Dday;
import com.a401.backend.domain.dday.dto.request.DdayRequestDto;
import com.a401.backend.domain.dday.dto.response.DdayResponseDto;
import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public boolean modifyUser(MemberRequestDto request, Member member) {
        Optional<Member> requestedMember = memberRepository.findByEmail(request.getEmail());
        if (member.getId() == requestedMember.get().getId()) {
            Member newMember = Member.builder()
                    .id(member.getId())
                    .createDate(member.getCreateDate())
                    .email(member.getEmail())
                    .isActive(member.isActive())
                    .membername(request.getMembername())
                    .provider(member.getProvider())
                    .providerId(member.getProviderId())
                    .roles(member.getRoles())
                    .profileImage(request.getProfileImage())
                    .build();

            memberRepository.save(newMember);
            return true;
        } else {
            return false;
        }
    }
}
