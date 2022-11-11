package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import com.a401.backend.domain.timeview.domain.TimeviewMonthly;
import com.a401.backend.domain.timeview.domain.TimeviewYearly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeviewYearlyRepository extends JpaRepository<TimeviewYearly,Long> {
    @Query(value = "SELECT count(*) FROM timeview_yearly WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    long countByMemberIdAndSubject(long member_id, int date, @Param("subject") String subject);

    @Query(value = "SELECT * FROM timeview_yearly WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    Optional<TimeviewYearly> findByData(long member_id, int date, @Param("subject") String subject);
}
