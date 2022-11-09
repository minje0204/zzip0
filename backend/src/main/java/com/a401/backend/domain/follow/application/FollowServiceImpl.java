package com.a401.backend.domain.follow.application;

import com.a401.backend.domain.follow.dao.FollowRepository;
import com.a401.backend.domain.follow.domain.Follow;
import com.a401.backend.domain.follow.dto.response.FollowResponseDto;
import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<FollowResponseDto> followeeList(Member member) {
        List<Member> list = memberRepository.findAllByFollowerId(member.getId());
        List<FollowResponseDto> response = new ArrayList<>();

        for(Member item : list) {
            FollowResponseDto dto = new FollowResponseDto(item);
            response.add(dto);
        }

        return response;
    }

    @Override
    public List<FollowResponseDto> followerList(Member member) {
        List<Member> list = memberRepository.findAllByFolloweeId(member.getId());
        List<FollowResponseDto> response = new ArrayList<>();

        for(Member item : list) {
            FollowResponseDto dto = new FollowResponseDto(item);
            response.add(dto);
        }

        return response;
    }

    @Override
    public boolean connect(String request, Member member) {
        Optional<Member> followee = memberRepository.findByProviderId(request);

        Follow follow = Follow.builder()
                .followeeMember(followee.get())
                .followerMember(member)
                .build();

        if (followRepository.countByFolloweeAndFollower(followee.get().getId(), member.getId())==0) {
            followRepository.save(follow);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean disconnect(String request, Member member) {
        Optional<Member> followee = memberRepository.findByProviderId(request);

        if (followRepository.countByFolloweeAndFollower(followee.get().getId(), member.getId())==1) {
            followRepository.deleteByIds(followee.get().getId(), member.getId());
            return true;
        } else {
            return false;
        }
    }
}
