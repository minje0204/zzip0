package com.a401.backend.domain.follow.dao;

import com.a401.backend.domain.follow.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {
    @Query(value = "SELECT count(*) FROM follow WHERE followee_id = :followeeId AND follower_id = :followerId",nativeQuery = true)
    long countByFolloweeAndFollower(Long followeeId, Long followerId);
}
