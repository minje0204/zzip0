package com.a401.backend.domain.member.dao;

import com.a401.backend.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndIsActiveTrue(String email);

    Optional<Member> findByProviderAndProviderId(String provider, String providerId);

    Optional<Member> findByProviderId(String providerId);

    @Query(value = "SELECT * FROM member LEFT JOIN follow ON follow.followee_id = member.id WHERE follower_id = :followerId", nativeQuery = true)
    List<Member> findAllByFollowerId(Long followerId);

    @Query(value = "SELECT * FROM member LEFT JOIN follow ON follow.follower_id = member.id WHERE followee_id = :followeeId", nativeQuery = true)
    List<Member> findAllByFolloweeId(Long followeeId);

    @Query(value = "SELECT * FROM member LEFT JOIN room_members ON room_members.member_id = member.id WHERE room_members.room_id =:roomId", nativeQuery = true)
    List<Member> findMemberByRoom(Long roomId);
}
