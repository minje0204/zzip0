package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeviewMonthlyRepository extends JpaRepository<TimeviewMonthly,Long> {
    @Query(value = "SELECT * FROM timeview_monthly WHERE member_id = :member_id AND date = :date",nativeQuery = true)
    Optional<TimeviewMonthly> findByMemberIdAndDate(long member_id, String date);
    @Query(value = "SELECT * FROM timeview_monthly WHERE member_id = :member_id AND date like :date%",nativeQuery = true)
    Optional<List<TimeviewMonthly>> findListByMemberIdAndDate(long member_id, String date);
}
