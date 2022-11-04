package com.a401.backend.domain.dday.dao;

import com.a401.backend.domain.dday.domain.Dday;
import com.a401.backend.domain.memo.domain.Memo;
import com.a401.backend.domain.memo.dto.response.MemoResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DdayRepository extends JpaRepository<Dday,Long> {
    List<Dday> findDdayIdAndDdayTitleAndDdayDateByMemberId(Long memberId);
}
