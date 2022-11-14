package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeviewDailyRepository extends JpaRepository<TimeviewDaily,Long> {
    @Query(value = "SELECT * FROM timeview_daily WHERE member_id = :member_id AND date = :date",nativeQuery = true)
    Optional<TimeviewDaily> findByMemberIdAndDate(long member_id, String date);
    @Query(value = "SELECT * FROM timeview_daily WHERE member_id = :member_id AND date like :date%",nativeQuery = true)
    Optional<List<TimeviewDaily>> findListByMemberIdAndDate(long member_id, String date);
}
