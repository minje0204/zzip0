package com.a401.backend.domain.timeview.dao;

import com.a401.backend.domain.timeview.domain.TimeviewYearly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeviewYearlyRepository extends JpaRepository<TimeviewYearly,Long> {
    @Query(value = "SELECT * FROM timeview_yearly WHERE member_id = :member_id AND date = :date",nativeQuery = true)
    Optional<TimeviewYearly> findByMemberIdAndDate(long member_id, String date);
}
