package com.a401.backend.domain.dday.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.application.MemoService;
import com.a401.backend.domain.memo.dao.MemoRepository;
import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class DdayServiceImpl implements MemoService {

    private final MemoRepository memoRepository;

    @Override
    public MemoResponseDto callMemo(Member member) {
        MemoResponseDto request = memoRepository.findMemoDataByMemberId(member.getId());

        return request;
    }

    @Override
    public void saveMemo(MemoRequestDto req, Member member) {
        Memo memo = memoRepository.findByMemberId(member.getId());
        Memo newMemo = Memo.builder()
                .memoId(memo.getMemoId())
                .member(memo.getMember())
                .memoData(req.getMemoData())
                .build();

        memoRepository.save(newMemo);
    }
}
