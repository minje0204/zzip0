package com.a401.backend.domain.dday.dao;

import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DdayRepository extends JpaRepository<Memo,Long> {
    MemoResponseDto findMemoDataByMemberId(Long memberId);
    Memo findByMemberId(Long memberId);
}
