package com.a401.backend.domain.follow.application;

import com.a401.backend.domain.follow.dao.FollowRepository;
import com.a401.backend.domain.follow.domain.Follow;
import com.a401.backend.domain.follow.dto.request.FollowRequestDto;
import com.a401.backend.domain.member.dao.MemberRepository;
import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.application.MemoService;
import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    @Override
    public boolean connect(FollowRequestDto request, Member member) {
        Optional<Member> followee = memberRepository.findByProviderId(request.getFolloweePID());

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

//    @Override
//    public MemoResponseDto callMemo(Member member) {
//        MemoResponseDto request = memoRepository.findMemoDataByMemberId(member.getId());
//
//        return request;
//    }
//
//    @Override
//    public void saveMemo(MemoRequestDto req, Member member) {
//        Memo memo = memoRepository.findByMemberId(member.getId());
//        Memo newMemo;
//
//        //등록된 메모가 있다면
//        if (memoRepository.countByMemberId(member.getId()) == 1) {
//            newMemo = Memo.builder()
//                    .memoId(memo.getMemoId())
//                    .member(memo.getMember())
//                    .memoData(req.getMemoData())
//                    .build();
//        } else {
//            newMemo = Memo.builder()
//                    .member(member)
//                    .memoData(req.getMemoData())
//                    .build();
//        }
//
//        memoRepository.save(newMemo);
//    }
}
