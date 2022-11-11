package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeviewDailyRepository extends JpaRepository<TimeviewDaily,Long> {
    @Query(value = "SELECT count(*) FROM timeview_daily WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    long countByData(long member_id, LocalDate date, @Param("subject") String subject);

    @Query(value = "SELECT * FROM timeview_daily WHERE member_id = :member_id AND date = :date AND subject = :subject",nativeQuery = true)
    Optional<TimeviewDaily> findByData(long member_id, LocalDate date, @Param("subject") String subject);

    @Query(value = "SELECT * FROM timeview_daily WHERE member_id = :member_id",nativeQuery = true)
    Optional<List<TimeviewDaily>> findAllByMemberId(long member_id);
}
