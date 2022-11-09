package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.dday.domain.Dday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeviewRepository extends JpaRepository<Dday,Long> {
    List<Dday> findDdayIdAndDdayTitleAndDdayDateByMemberId(Long memberId);
    Dday findByDdayId(Long ddayId);
}
