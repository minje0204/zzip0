package com.a401.backend.domain.member.application;

import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.member.dto.MemberModifyRequestDto;
import com.a401.backend.domain.member.dto.ResignRequestDto;
import com.a401.backend.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public boolean modifyUser(MemberModifyRequestDto request, Member member) {
        Member newMember = memberRepository.findById(member.getId()).orElse(null);
        try {
            if (request.isEmailNotNull()) {
                newMember.setEmail(request.getEmail());
            }
            if (request.isMemberNameNotNull()) {
                newMember.setMemberName(request.getMemberName());
            }
            if (request.isIntroduceNotNull()) {
                newMember.setIntroduce(request.getIntroduce());
            }
            System.out.println(request.toString());
            memberRepository.save(newMember);
            System.out.println(newMember.toString());
            return true;
        } catch (Exception e) {
            System.out.println("modify err occurred!");
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public void resignUser(ResignRequestDto request, Member member) {
        member.setActive(false);
        memberRepository.save(member);
    }

    @Override
    public Member findMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndIsActiveTrue(email);
        return optionalMember.orElse(null);
    }
}
