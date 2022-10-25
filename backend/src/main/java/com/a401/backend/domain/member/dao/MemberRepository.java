package com.a401.backend.domain.member.dao;

import com.a401.backend.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMembername(String membername);

    Optional<Member> findByProviderAndProviderId(String provider, String providerId);
}
