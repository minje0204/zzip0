package com.a401.backend.domain.member.dao;

import com.a401.backend.domain.member.domain.Member;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);
    
    Optional<Member> findByProviderAndProviderId(String provider, String providerId);

    Optional<Member> findByProviderId(String providerId);

    @Query(value = "SELECT * FROM member LEFT JOIN follow ON follow.followee_id = member.id WHERE follower_id = :followerId",nativeQuery = true)
    List<Member> findAllByFollowerId(Long followerId);
}
