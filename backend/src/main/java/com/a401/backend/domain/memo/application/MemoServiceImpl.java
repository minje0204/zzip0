package com.a401.backend.domain.memo.application;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.memo.dao.MemoRepository;
import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.request.MemoRequestDto;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class MemoServiceImpl implements MemoService {

    private final MemoRepository memoRepository;

    @Override
    public MemoResponseDto callMemo(Member member) {
        MemoResponseDto request = memoRepository.findMemoDataByMemberId(member.getId());

        return request;
    }

    @Override
    public void saveMemo(MemoRequestDto req, Member member) {
        Memo memo = memoRepository.findByMemberId(member.getId());
        Memo newMemo;

        //등록된 메모가 있다면
        if (memoRepository.countByMemberId(member.getId()) == 1) {
            newMemo = Memo.builder()
                    .memoId(memo.getMemoId())
                    .member(memo.getMember())
                    .memoData(req.getMemoData())
                    .build();
        } else {
            newMemo = Memo.builder()
                    .member(member)
                    .memoData(req.getMemoData())
                    .build();
        }

        memoRepository.save(newMemo);
    }
}
