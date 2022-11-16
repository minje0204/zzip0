package com.a401.backend.domain.timelog.dao;

import com.a401.backend.domain.member.domain.Member;
import com.a401.backend.domain.timelog.domain.Timelog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimelogRepository extends JpaRepository<Timelog, Long> {
    Optional<List<Timelog>> findAllByMemberIdAndDate(long member_id, LocalDate date);

    List<Timelog> findAllByMemberAndEndTimeIsNull(Member member);

    @Query(value = "SELECT * FROM timelog WHERE member_id = :member_id ORDER BY timelog_id DESC limit 1",nativeQuery = true)
    Timelog findByMember(long member_id);
}
