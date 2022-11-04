package com.a401.backend.domain.background.dao;

import com.a401.backend.domain.background.domain.Background;
import com.a401.backend.domain.background.domain.BackgroundLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BackgroundLikeRepository extends JpaRepository<BackgroundLike,Long> {
    @Query(value = "SELECT count(*) FROM background_like WHERE bg_id = :bgId AND member_id= :memberId",nativeQuery = true)
    long countByBgIdAndMemberId(Long bgId, Long memberId);

    @Query(value = "DELETE FROM background_like WHERE bg_id = :bgId and member_id = :memberId",nativeQuery = true)
    List<Background> deleteByBgAndMember(@Param("bgId") Long bgId ,@Param("memberId") Long memberId);
}
