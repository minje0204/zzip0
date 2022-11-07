package com.a401.backend.domain.memo.dao;

import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoRepository extends JpaRepository<Memo,Long> {
    MemoResponseDto findMemoDataByMemberId(Long memberId);
    Memo findByMemberId(Long memberId);
    @Query(value = "SELECT count(*) FROM memo WHERE member_id= :memberId",nativeQuery = true)
    long countByMemberId(Long memberId);
}
