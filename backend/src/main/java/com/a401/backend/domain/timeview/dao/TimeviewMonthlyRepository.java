package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeviewMonthlyRepository extends JpaRepository<TimeviewMonthly,Long> {
    @Query(value = "SELECT count(*) FROM timeview_daily WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    long countByMemberIdAndSubject(long member_id, int date, @Param("subject") String subject);

    @Query(value = "SELECT * FROM timeview_monthly WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    Optional<TimeviewMonthly> findByData(long member_id, int date, @Param("subject") String subject);

    Optional<List<TimeviewDaily>> findAllByMemberId(long member_id);
}
